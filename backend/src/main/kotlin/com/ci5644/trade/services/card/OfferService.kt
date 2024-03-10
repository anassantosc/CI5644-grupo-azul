package com.ci5644.trade.services.card

import com.ci5644.trade.models.card.OfferEntity
import com.ci5644.trade.dto.OfferDto
import com.ci5644.trade.repositories.OfferRepository
import com.ci5644.trade.repositories.CardRepository
import com.ci5644.trade.repositories.UserRepository
import com.ci5644.trade.repositories.OwnershipRepository
import com.ci5644.trade.models.card.OwnershipEntity
import com.ci5644.trade.exceptions.runtime.OfferNotFoundException
import com.ci5644.trade.services.auth.AuthorizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service 
import com.ci5644.trade.models.card.OfferStatus  
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus


@Service
class OfferService(private val authorizationService: AuthorizationService, private val offerRepository: OfferRepository, private val ownershipRepository: OwnershipRepository) {

    private fun validateUserDoesNotOwnCard(userOfferId: Int, cardReceive: Int) {
        if (ownershipRepository.existsByUserAndCard(userOfferId, cardReceive)) {
            throw IllegalArgumentException("El usuario ya posee la carta que se quiere recibir")
        }
    }

    private fun validateUsersReceiveNotEmpty(usersReceive: List<Int>) {
        if (usersReceive.isEmpty()) {
            throw IllegalArgumentException("No hay ningun usuario compatible con la oferta")
        }
    }

    private fun validateOfferStatus(offerId: Int) : OfferEntity {
        val offer = offerRepository.findById(offerId)
        if (offer == null) {
            throw OfferNotFoundException()
        }

        if (offer.status != OfferStatus.PENDING && offer.status != OfferStatus.COUNTEROFFER) {
            throw IllegalArgumentException("El estado actual no es valido para aceptar la oferta")
        }
        return offer
    }

    /* 
    * Retrieves a list of offers made by a user.
    *
    * @param userOfferId   The ID of the user who made the offers
    * @param cardOfferId   The ID of the card offered
    * @param cardReceiveId The ID of the card received
    * @return              A list of offers made by the user
    */
    fun createOffer(usernameOffer: String, cardOffer: Int, cardReceive: Int) {
        val userOffer = authorizationService.retrieveUser(usernameOffer).id
        val usersReceive = ownershipRepository.findUserByCard(cardReceive)
        
        validateUserDoesNotOwnCard(userOffer, cardReceive)
        validateUsersReceiveNotEmpty(usersReceive)
        
        var isCreated = false
        for (userReceive in usersReceive) {
            val offer = OfferEntity(
                userOffer = userOffer,
                userReceive = userReceive, 
                cardOffer = cardOffer,
                cardReceive = cardReceive, 
                status = OfferStatus.PENDING
            )
            if (offerRepository.existByUsers(userOffer, userReceive, cardOffer, cardReceive)) {
                continue
            }
            offerRepository.save(offer)
            isCreated = true         
        }

        if (!isCreated) throw IllegalArgumentException("No se pudo crear la oferta, ya existe una oferta con las mismas caracteristicas")
    }


    /* 
        * Retrieves a list of offers made by a user.
        *
        * @param pageable The Pageable object that provides the pagination information.
        * @return A page of offers made with PENDING status
        */
    fun getAvailableOffers(username: String, page: Int) : List<OfferEntity> {
        val userId = authorizationService.retrieveUser(username).id
        val pageable: Pageable = PageRequest.of(page, 5)
        return offerRepository.findAvailableByUserReceive(userId, pageable)
    }
    
    /*
    * Retrieves a offer with a status change to denied.
    *
    * @param offerId The ID of the offer
    * @return A offer with the new status
    */
    fun denyOffer(offerId: Int) {
        val offer = validateOfferStatus(offerId)
        offer.status = OfferStatus.CANCELLED
        offerRepository.save(offer)
    }

    /*
    * Retrieves a offer with a status change to accept.
    *
    * @param offerId The ID of the offer
    * @return A offer with the new status
    */
    fun acceptOffer(offerId: Int) {
        val offer = validateOfferStatus(offerId)
        
        val ownerOffer = ownershipRepository.findByUserAndCard(offer.userOffer, offer.cardOffer)
        val ownerReceive = ownershipRepository.findByUserAndCard(offer.userReceive, offer.cardReceive)
            
        //Se verifica que el usuario tenga al menos 2 cartas para poder hacer el intercambio
        if (ownerOffer.quantity < 2 || ownerReceive.quantity < 2) {
            offer.status = OfferStatus.AUTO_CANCELLED
            throw NoSuchElementException("El usuario no tiene suficientes cartas para hacer el intercambio")
        }

        //Se actualizan los datos de propiedad al aceptar la oferta
        val newOwnerOffer = OwnershipEntity (user = offer.userReceive, card = offer.cardOffer)
        val newOwnerReceive = OwnershipEntity (user = offer.userOffer, card = offer.cardReceive)

        ownershipRepository.save(newOwnerOffer)
        ownershipRepository.save(newOwnerReceive)

        ownerOffer.quantity -= 1
        ownerReceive.quantity -= 1
        
        ownershipRepository.save(ownerOffer)
        ownershipRepository.save(ownerReceive)

        offer.status = OfferStatus.ACCEPTED
        offerRepository.save(offer)

        //Se cancelan las ofertas de los otros usuarios para el userOffer
        var otherOffers = offerRepository.findByUserAndCard(offer.userReceive, offer.cardReceive)
        for (otherOffer in otherOffers) {
            if (otherOffer.userReceive != offer.userOffer) {
                otherOffer.status = OfferStatus.AUTO_CANCELLED
                offerRepository.save(otherOffer)
            }
        }

        //Se cancelan las ofertas de los otros usuarios para el userReceive
        otherOffers = offerRepository.findByUserAndCard(offer.userOffer, offer.cardOffer)
        for (otherOffer in otherOffers) {
            if (otherOffer.userOffer != offer.userReceive) {
                otherOffer.status = OfferStatus.AUTO_CANCELLED
                offerRepository.save(otherOffer)
            }
        }
    }


    /** Retrieves an offer with a status change to counteroffer.
    *
    * @param offerId The ID of the offer
    * @param cardOffer The ID of the new card Offer
    * @param cardReceive The ID of the new card receive
    * @return A offer with new counteroffer status
    */
    fun createCounterOffer(offerId: Int, cardOffer: Int, cardReceive: Int) {
        val offer = offerRepository.findById(offerId)
        if (offer == null) {
            throw IllegalArgumentException("La oferta no existe")
        }
        if (offer.status != OfferStatus.PENDING) {
            throw IllegalArgumentException("El estado actual no es valido para crear una contraoferta")
        }

        offer.status = OfferStatus.COUNTEROFFER
        val temp = offer.userReceive
        offer.userReceive = offer.userOffer
        offer.userOffer = temp
        offer.cardOffer = cardOffer
        offer.cardReceive = cardReceive
        
        if (offerRepository.existByUsers(offer.userOffer, offer.userReceive, cardOffer, cardReceive)) {
            throw IllegalArgumentException("Una oferta con las mismas caracteristicas ya existe")
        }

        validateUserDoesNotOwnCard(offer.userReceive, offer.cardOffer)
        validateUserDoesNotOwnCard(offer.userOffer, offer.cardReceive)

        offerRepository.save(offer)
    }
}
