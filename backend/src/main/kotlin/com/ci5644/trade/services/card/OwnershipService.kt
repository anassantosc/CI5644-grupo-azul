package com.ci5644.trade.services.card

import com.ci5644.trade.repositories.OwnershipRepository
import com.ci5644.trade.models.card.OwnershipEntity
import com.ci5644.trade.exceptions.runtime.NonOwnershipException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.jpa.repository.JpaRepository

@Service
class OwnershipService() {

    @Autowired
    lateinit var ownershipRepository: OwnershipRepository

    /**
     * Add ownership of a card to a user
     * 
     * @param userId    The id of the user
     * @param cardId    The id of the card
     */
    fun addOwnership(userId: Long, cardId: Int) {
        val ownership: OwnershipEntity? = ownershipRepository.findByUserIdAndCardId(userId, cardId)
        if (ownership != null) {
            ownership.increaseQuantity()
        } else {
            ownershipRepository.save(OwnershipEntity(userId = userId, cardId = cardId, quantity = 1, visibility = true))
        }
    }

    /**
     * Remove one card of the ownership beetween a card and an user
     * 
     * @param userId        The id of the user
     * @param cardId        The id of the card
     */
    fun removeOwnership(userId: Long, cardId: Int) {
        val ownership: OwnershipEntity? = ownershipRepository.findByUserIdAndCardId(userId, cardId)

        if (ownership != null) {
            if (ownership.quantity <= 1) {
                ownershipRepository.delete(ownership)
            } else {
                ownership.decreaseQuantity()
            }
        } else {
            throw NonOwnershipException()
        }
    }

    /**
     * Change the visibility of an ownership between a user and a card.
     * 
     * @param userId        The ID of the user
     * @param cardId        The ID of the card
     * @param visibility    The new visibility status
     * @throws NonOwnershipException if the ownership doesn't exist
     */
    fun changeOwnershipVisibility(userId: Long, cardId: Int, visibility: Boolean) {
        val ownership: OwnershipEntity? = ownershipRepository.findByUserIdAndCardId(userId, cardId)

        if (ownership != null) {
            ownership.setVisiblity(visibility)
        } else {
            throw NonOwnershipException()
        }
    }
    
    /**
     * Change the visibility of all ownership records of a user.
     * 
     * @param userId        The ID of the user
     * @param visibility    The new visibility status
     */
    fun changeAllOwnershipVisibility(userId: Long, visibility: Boolean) {
        val ownershipList: List<OwnershipEntity> = ownershipRepository.findByUserId(userId)
        ownershipList.forEach { it.setVisiblity(visibility) }
    }

    /**
     * Exchange ownership of two cards between two users.
     * 
     * @param offerUserId   The ID of the user offering the card
     * @param offerCardId   The ID of the card being offered
     * @param receiveUserId The ID of the user receiving the card
     * @param receiveCardId The ID of the card being received
     * @throws NonOwnershipException if either user does not own the respective cards
     */
    fun tradeOwnership(offerUserId: Long, offerCardId: Int, recieveUserId: Long, recieveCardId: Int) {
        val offerOwnership: OwnershipEntity? = ownershipRepository.findByUserIdAndCardId(offerUserId, offerCardId)
        val recieveOwnership: OwnershipEntity? = ownershipRepository.findByUserIdAndCardId(recieveUserId, recieveCardId)

        if (offerOwnership == null || recieveOwnership == null) {
            throw NonOwnershipException()
        }

        removeOwnership(offerUserId, offerCardId)
        removeOwnership(recieveUserId, recieveCardId)
        addOwnership(offerUserId, recieveCardId)
        addOwnership(recieveUserId, offerCardId)
    }

    /**
     * Retrieve a paginated list of ownership records owned by a user.
     * 
     * @param userId        The ID of the user
     * @param pageable      Pagination information
     * @return              A page of ownership records
     */
    fun getOwnedCards(userId: Long, pageable: Pageable): Page<OwnershipEntity> {
        val allOwnedCards = ownershipRepository.findByUserId(userId)

        val startIndex = pageable.pageNumber * pageable.pageSize
        val endIndex = kotlin.math.min(startIndex + pageable.pageSize, allOwnedCards.size)

        val pageOfOwnedCards = allOwnedCards.subList(startIndex, endIndex)
        return PageImpl<OwnershipEntity>(pageOfOwnedCards, pageable, allOwnedCards.size.toLong())
    }

    /**
     * Retrieves a list of pairs of (userId, number of possessions), sorted by the number of possessions in descending order.
     *
     * @param limit         The maximum number of results to return
     * @return              A list of pairs of (userId, number of possessions)
     */
    fun getMostPossessions(limit: Int): List<Pair<Long, Int>> {
        return ownershipRepository.findAllUserIdsWithPossessions().toList()
            .sortedByDescending { it.second }
            .take(limit)
    }
}