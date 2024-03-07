package com.ci5644.trade.services.card

import com.ci5644.trade.models.card.OfferEntity
import com.ci5644.trade.dto.OfferDto
import com.ci5644.trade.repositories.OfferRepository
import com.ci5644.trade.repositories.CardRepository
import com.ci5644.trade.repositories.UserRepository
import com.ci5644.trade.repositories.OwnershipRepository
import com.ci5644.trade.models.card.OwnershipEntity
import com.ci5644.trade.services.auth.AuthorizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service 
import com.ci5644.trade.models.card.OfferStatus  
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest


@Service
class OfferService(private val authorizationService: AuthorizationService) {
    @Autowired
    lateinit var offerRepository: OfferRepository

    @Autowired
    lateinit var ownershipRepository: OwnershipRepository

    /* 
    * Retrieves a list of offers made by a user.
    *
    * @param userOfferId   The ID of the user who made the offers
    * @param cardOfferId   The ID of the card offered
    * @param cardReceiveId The ID of the card received
    * @return              A list of offers made by the user
    */
    fun createOffer(usernameOffer: String, cardOffer: Int, cardReceive: Int) : List<OfferEntity> {
        val userOffer = authorizationService.retrieveUser(usernameOffer).id
        val usersReceive = ownershipRepository.findUserByCard(cardReceive)
        val offerList = mutableListOf<OfferEntity>()
        
        if (offerRepository.findByUserOfferAndCardOfferAndCardReceive(userOffer, cardOffer, cardReceive).isEmpty()) {
            return offerList
        }
        
        for (user in usersReceive) {
            if (user != userOffer) {
                
            val entity = OfferEntity(
                userOffer = userOffer,
                userReceive = user,
                cardOffer = cardOffer,
                cardReceive = cardReceive, 
                status = OfferStatus.PENDING
            )
            offerRepository.save(entity)
            offerList.add(entity)
            }
            
        }
        return offerList
    }

    
    /* 
        * Retrieves a list of offers made by a user.
        *
        * @param pageable The Pageable object that provides the pagination information.
        * @return A page of offers made with PENDING status
        */
    fun getPendingOffers(username: String, page: Int) : Page<OfferEntity> {
        val userId = authorizationService.retrieveUser(username).id
        val pageable: Pageable = PageRequest.of(page, 20)
        val offer = offerRepository.findByStatus(userId, OfferStatus.PENDING, pageable)
        return offer
    }
    
    /*
    * Retrieves a offer with a status change.
    *
    * @param offerId The ID of the offer
    * @param status  The new status of the offer
    * @return A offer with the new status
    */
    fun updateOfferByStatus(offerId: Int, status: OfferStatus): OfferDto {
        val entity = offerRepository.findById(offerId.toLong()).get()
        entity.status = status
        val savedEntity = offerRepository.save(entity)
        
        /* 
        if (status == OfferStatus.CANCELLED) {
            offerRepository.deleteById(offerId.toLong())
        }
        */

        if (status == OfferStatus.ACCEPTED) {
            val ownerOffer = ownershipRepository.findByUserAndCard(entity.userOffer, entity.cardOffer)
            val ownerReceive = ownershipRepository.findByUserAndCard(entity.userReceive, entity.cardReceive)
            
            //Se actualizan los datos de propiedad al aceptar la oferta
            val newOwnerOffer = OwnershipEntity ( 
               user = entity.userReceive,
               card = entity.cardOffer,
           )

           val newOwnerReceive = OwnershipEntity ( 
               user = entity.userOffer,
               card = entity.cardReceive,
            )
            ownershipRepository.save(newOwnerOffer)
            ownershipRepository.save(newOwnerReceive)

            ownerOffer.quantity -= 1
            ownerReceive.quantity -= 1

            //Se cancelan las ofertas de los otros usuarios
             val otherUsersReceives = offerRepository.findByUserOfferAndCardOfferAndCardReceive(entity.userOffer, entity.cardOffer, entity.cardReceive)
            for (otherUser in otherUsersReceives) {
                if (otherUser.id != entity.userReceive) {
                    otherUser.status = OfferStatus.CANCELLED
                    offerRepository.save(otherUser)
                }
            }
            
        }

        return OfferDto.fromEntity(savedEntity)
    }

    /*
    * Retrieves a offer by ID.
    *
    * @param offerId The ID of the offer
    * @return A offer with the ID
    */
    fun findOfferById(offerId: Int): OfferEntity? {
        return offerRepository.findById(offerId.toLong()).orElse(null)
    }
}
