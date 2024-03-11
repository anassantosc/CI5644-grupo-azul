package com.ci5644.trade.services.card

import com.ci5644.trade.repositories.OwnershipRepository
import com.ci5644.trade.models.card.OwnershipEntity
import com.ci5644.trade.repositories.CardRepository
import com.ci5644.trade.exceptions.runtime.OfferNotFoundException
import com.ci5644.trade.services.auth.AuthorizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import com.ci5644.trade.models.card.CardEntity
import com.ci5644.trade.repositories.OfferRepository
import kotlin.math.min

@Service
class OwnershipService(private val authorizationService: AuthorizationService, private val offerRepository: OfferRepository, private val ownershipRepository: OwnershipRepository, private val cardRepository: CardRepository) {
    
    /**
     * Retrieve a paginated list of card entities owned by a user.
     *
     * @param userId   The ID of the user
     * @param page     The page number (starts from 0)
     * @return         A list of card entities within the specified page
     */
    fun getCardsPerPage(username: String, page: Int): List<CardEntity> {
        val userId = authorizationService.retrieveUser(username).id
        val startIndex = (page * 20) + 1
        val endIndex = startIndex + 21
        val ownedCards = ownershipRepository.findByUser(userId)
            .filter { it.card in startIndex until endIndex }
            .map { it.card }
        return cardRepository.findAllById(ownedCards)
    }


    /**
     * Retrieves a list of pairs of (user, number of possessions), sorted by the number of possessions in descending order.
     *
     * @param limit         The maximum number of results to return
     * @return              A list of pairs of (user, number of possessions)
     */
    fun getMostPossessions(limit: Int): List<Pair<String, Float>> {
        val totalPossibleCards = 640 // Total possible cards
        val usersWithPossessions = ownershipRepository.findAllUsersWithPossessions()
            .map { Pair(it[0] as String, ((it[1] as Long).toFloat() / totalPossibleCards) * 100) }
            .take(limit)
        return usersWithPossessions
    }

    fun getUserProgress(username: String): Float {
        val userId = authorizationService.retrieveUser(username).id
        val allOwnedCards: List<OwnershipEntity> = ownershipRepository.findByUser(userId)
        val totalPossibleCards = 640
        val ownedCardsCount = allOwnedCards.size
        return if (ownedCardsCount > 0) {
            (ownedCardsCount.toFloat() / totalPossibleCards) * 100 // Calculate the progress as a porcentage
        } else {
            0f // If the user does not posses any card, its progress is 0
        }
    }

    /*
    * Retrieve a paginated list of the cards with quantity > 1
    *
    * @param userId   The ID of the user
    * @param page     The page number (starts from 0)
    * @return         A list of card entities within the specified page
    */
    fun getDuplicatedCards(username: String, page: Int): List<Int> {
        val userId = authorizationService.retrieveUser(username).id
        val pageable: Pageable = PageRequest.of(page, 20)
        return ownershipRepository.findDuplicatedCards(userId, pageable)
    }

    /*
    * Retrieve a paginated list of the cards that the user does not own
    *
    * @param username The username of the user
    * @param page     The page number (starts from 0)
    * @param id       The ID of the offer (optional)
    * @return         A list of card IDs within the specified page
    * @throws         OfferNotFoundException if the offer is not found
    */
    fun getNonOwnedCards(username: String, page: Int, offerId: Int?): List<Int> {
        val userId = authorizationService.retrieveUser(username).id
        val pageable: Pageable = PageRequest.of(page, 20)

        if (offerId != null) {
            val offer = offerRepository.findById(offerId) ?: throw OfferNotFoundException()
            return ownershipRepository.findInterceptionCards(userId, offer.userOffer, pageable)
        } else {
            return ownershipRepository.findNonOwnedCards(userId, pageable)
        }
    }

}
