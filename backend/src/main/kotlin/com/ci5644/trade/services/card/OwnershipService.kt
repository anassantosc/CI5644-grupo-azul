package com.ci5644.trade.services.card

import com.ci5644.trade.repositories.OwnershipRepository
import com.ci5644.trade.models.card.OwnershipEntity
import com.ci5644.trade.repositories.CardRepository
import com.ci5644.trade.exceptions.runtime.NonOwnershipException
import com.ci5644.trade.services.auth.AuthorizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import com.ci5644.trade.models.card.CardEntity

@Service
class OwnershipService(private val authorizationService: AuthorizationService) {

    @Autowired
    lateinit var ownershipRepository: OwnershipRepository

    @Autowired
    lateinit var cardRepository: CardRepository

    /**
     * Retrieve a paginated list of card entities owned by a user.
     * 
     * @param userId   The ID of the user
     * @param page     The page number (starts from 0)
     * @return         A list of card entities within the specified page
     */
    fun getCardsPerPage(username: String, page: Int): List<CardEntity> {
        val userId = authorizationService.retrieveUser(username).id
        val pageable: Pageable = PageRequest.of(page, 20)
        val ownershipPage = ownershipRepository.findByUser(userId, pageable)
        val ownedCards = ownershipPage.content.map { it.card }
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
    * @param userId   The ID of the user
    * @param page     The page number (starts from 0)
    * @return         A list of card entities within the specified page
    */
    fun getNonOwnedCards(username: String, page: Int): List<CardEntity> {
        val userId = authorizationService.retrieveUser(username).id
        val pageable: Pageable = PageRequest.of(page, 20)
        val ownedCards = ownershipRepository.findByUser(userId).map { it.card }
        val nonOwnedCards = cardRepository.findAll().filter { it.id !in ownedCards }
        return nonOwnedCards
    }
}