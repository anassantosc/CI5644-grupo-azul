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
import java.util.stream.Stream
import java.util.NoSuchElementException


@Service
class OfferService(private val authorizationService: AuthorizationService) {
    @Autowired
    lateinit var offerRepository: OfferRepository

    @Autowired
    lateinit var ownershipRepository: OwnershipRepository

    private fun validateUserDoesNotOwnCard(userOfferId: Int, cardReceive: Int) {
        if (ownershipRepository.existsByUserAndCard(userOfferId, cardReceive)) {
            throw IllegalArgumentException("User offer already has the card to receive")
        }
    }

    private fun validateUsersReceiveNotEmpty(usersReceive: List<Int>) {
        if (usersReceive.isEmpty()) {
            throw NoSuchElementException("No users to receive the offer")
        }
    }

    private fun validateOfferStatus(offerId: Int) : OfferEntity {
        val entity = offerRepository.findById(offerId)
        if (entity == null) {
            throw OfferNotFoundException()
        }

        if (entity.status != OfferStatus.PENDING && entity.status != OfferStatus.COUNTEROFFER) {
            throw IllegalArgumentException("The current status is not valid for accepting the offer")
        }
        return entity
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

        for (userReceive in usersReceive) {
            val entity = OfferEntity(
                userOffer = userOffer,
                userReceive = userReceive,
                cardOffer = cardOffer,
                cardReceive = cardReceive,
                status = OfferStatus.PENDING
            )
            if (offerRepository.existByUsers(userOffer, userReceive, cardOffer, cardReceive)) {
                continue
            }
            offerRepository.save(entity)
        }
    }


    /*
        * Retrieves a list of offers made by a user.
        *
        * @param pageable The Pageable object that provides the pagination information.
        * @return A page of offers made with PENDING status
        */
    fun getAvailableOffers(username: String, page: Int) : List<OfferEntity> {
        val userId = authorizationService.retrieveUser(username).id
        val pageable: Pageable = PageRequest.of(page, 20)
        return offerRepository.findAvailableByUserReceive(userId, pageable)
    }

    /*
    * Retrieves a offer with a status change to denied.
    *
    * @param offerId The ID of the offer
    * @return A offer with the new status
    */
    fun denyOffer(offerId: Int) {
        val entity = validateOfferStatus(offerId)
        entity.status = OfferStatus.CANCELLED
        offerRepository.save(entity)
    }

    /*
    * Retrieves a offer with a status change to accept.
    *
    * @param offerId The ID of the offer
    * @return A offer with the new status
    */
    fun acceptOffer(offerId: Int) {
        val entity = validateOfferStatus(offerId)

        val ownerOffer = ownershipRepository.findByUserAndCard(entity.userOffer, entity.cardOffer)
        val ownerReceive = ownershipRepository.findByUserAndCard(entity.userReceive, entity.cardReceive)

        //Se verifica que el usuario tenga al menos 2 cartas para poder hacer el intercambio
        if (ownerOffer.quantity < 2 || ownerReceive.quantity < 2) {
            entity.status = OfferStatus.AUTO_CANCELLED
            throw NoSuchElementException("The user does not have enough cards to trade")
        }

        //Se actualizan los datos de propiedad al aceptar la oferta
        val newOwnerOffer = OwnershipEntity (user = entity.userReceive, card = entity.cardOffer)
        val newOwnerReceive = OwnershipEntity (user = entity.userOffer, card = entity.cardReceive)

        ownershipRepository.save(newOwnerOffer)
        ownershipRepository.save(newOwnerReceive)

        ownerOffer.quantity -= 1
        ownerReceive.quantity -= 1

        ownershipRepository.save(ownerOffer)
        ownershipRepository.save(ownerReceive)

        entity.status = OfferStatus.ACCEPTED
        offerRepository.save(entity)

        //Se cancelan las ofertas de los otros usuarios para el userOffer
        var otherOffers = offerRepository.findByUserAndCard(entity.userOffer, entity.cardReceive)
        for (otherOffer in otherOffers) {
            if (otherOffer.userReceive != entity.userReceive) {
                otherOffer.status = OfferStatus.AUTO_CANCELLED
                offerRepository.save(otherOffer)
            }
        }

        //Se cancelan las ofertas de los otros usuarios para el userReceive
        otherOffers = offerRepository.findByUserAndCard(entity.userReceive, entity.cardOffer)
        for (otherOffer in otherOffers) {
            if (otherOffer.userOffer != entity.userOffer) {
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
            throw IllegalArgumentException("An offer with this id does not exists")
        }
        if (offer.status != OfferStatus.PENDING) {
            throw IllegalArgumentException("The offer is not pending")
        }

        offer.status = OfferStatus.COUNTEROFFER
        val temp = offer.userReceive
        offer.userReceive = offer.userOffer
        offer.userOffer = temp
        offer.cardOffer = cardOffer
        offer.cardReceive = cardReceive

        if (offerRepository.existByUsers(offer.userOffer, offer.userReceive, cardOffer, cardReceive)) {
            throw IllegalArgumentException("An offer with this characteristics already exists")
        }

        validateUserDoesNotOwnCard(offer.userReceive, offer.cardOffer)
        validateUserDoesNotOwnCard(offer.userOffer, offer.cardReceive)

        offerRepository.save(offer)
    }
}
