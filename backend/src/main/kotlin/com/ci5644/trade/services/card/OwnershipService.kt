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
     * @param user    The id of the user
     * @param card    The id of the card
     */
    fun addOwnership(user: Long, card: Int) {
        val ownership: OwnershipEntity? = ownershipRepository.findByUserAndCard(user, card)
        if (ownership != null) {
            ownership.increaseQuantity()
        } else {
            ownershipRepository.save(OwnershipEntity(user = user, card = card, quantity = 1, visibility = true))
        }
    }

    /**
     * Remove one card of the ownership beetween a card and an user
     * 
     * @param user        The id of the user
     * @param card        The id of the card
     */
    fun removeOwnership(user: Long, card: Int) {
        val ownership: OwnershipEntity? = ownershipRepository.findByUserAndCard(user, card)

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
     * @param user        The ID of the user
     * @param card        The ID of the card
     * @param visibility    The new visibility status
     * @throws NonOwnershipException if the ownership doesn't exist
     */
    fun changeOwnershipVisibility(user: Long, card: Int, visibility: Boolean) {
        val ownership: OwnershipEntity? = ownershipRepository.findByUserAndCard(user, card)

        if (ownership != null) {
            ownership.setVisiblity(visibility)
        } else {
            throw NonOwnershipException()
        }
    }
    
    /**
     * Change the visibility of all ownership records of a user.
     * 
     * @param user        The ID of the user
     * @param visibility    The new visibility status
     */
    fun changeAllOwnershipVisibility(user: Long, visibility: Boolean) {
        val ownershipList: List<OwnershipEntity> = ownershipRepository.findByUser(user)
        ownershipList.forEach { it.setVisiblity(visibility) }
    }

    /**
     * Exchange ownership of two cards between two users.
     * 
     * @param offerUser   The ID of the user offering the card
     * @param offerCard   The ID of the card being offered
     * @param receiveUser The ID of the user receiving the card
     * @param receiveCard The ID of the card being received
     * @throws NonOwnershipException if either user does not own the respective cards
     */
    fun tradeOwnership(offerUser: Long, offerCard: Int, recieveUser: Long, recieveCard: Int) {
        val offerOwnership: OwnershipEntity? = ownershipRepository.findByUserAndCard(offerUser, offerCard)
        val recieveOwnership: OwnershipEntity? = ownershipRepository.findByUserAndCard(recieveUser, recieveCard)

        if (offerOwnership == null || recieveOwnership == null) {
            throw NonOwnershipException()
        }

        removeOwnership(offerUser, offerCard)
        removeOwnership(recieveUser, recieveCard)
        addOwnership(offerUser, recieveCard)
        addOwnership(recieveUser, offerCard)
    }

    /**
     * Retrieve a paginated list of ownership records owned by a user.
     * 
     * @param user        The ID of the user
     * @param pageable      Pagination information
     * @return              A page of ownership records
     */
    fun getOwnedCards(user: Long, pageable: Pageable): Page<OwnershipEntity> {
        val allOwnedCards = ownershipRepository.findByUser(user)

        val startIndex = pageable.pageNumber * pageable.pageSize
        val endIndex = kotlin.math.min(startIndex + pageable.pageSize, allOwnedCards.size)

        val pageOfOwnedCards = allOwnedCards.subList(startIndex, endIndex)
        return PageImpl<OwnershipEntity>(pageOfOwnedCards, pageable, allOwnedCards.size.toLong())
    }

    /**
     * Retrieves a list of pairs of (user, number of possessions), sorted by the number of possessions in descending order.
     *
     * @param limit         The maximum number of results to return
     * @return              A list of pairs of (user, number of possessions)
     */
    fun getMostPossessions(limit: Int): List<Pair<Long, Int>> {
        return ownershipRepository.findAllUsersWithPossessions().toList()
            .sortedByDescending { it.second }
            .take(limit)
    }
}