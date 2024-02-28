package com.ci5644.trade.services.card

import com.ci5644.trade.models.card.OfferEntity
import com.ci5644.trade.dto.OfferDto
import com.ci5644.trade.repositories.OfferRepository
import com.ci5644.trade.repositories.CardRepository
import com.ci5644.trade.repositories.UserRepository
import com.ci5644.trade.repositories.OwnershipRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service 
import com.ci5644.trade.models.card.OfferStatus  
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page


@Service
class OfferService() {
    @Autowired
    lateinit var offerRepository: OfferRepository

    @Autowired 
    lateinit var cardRepository: CardRepository
    
    @Autowired
    lateinit var userRepository: UserRepository

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
    fun createOffer(userOffer:Int, cardOffer: Int, cardReceive: Int) : List<OfferEntity> {
        val usersReceive = ownershipRepository.findUserByCard(cardReceive)
        val offerList = mutableListOf<OfferEntity>()
        
        for (user in usersReceive) {
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
        return offerList
    }

    
    /* 
        * Retrieves a list of offers made by a user.
        *
        * @param pageable The Pageable object that provides the pagination information.
        * @return A page of offers made with PENDING status
        */
    fun getPendingOffers(pageable: Pageable) : Page<OfferEntity> {
        return offerRepository.findByStatus(OfferStatus.PENDING, pageable)
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
