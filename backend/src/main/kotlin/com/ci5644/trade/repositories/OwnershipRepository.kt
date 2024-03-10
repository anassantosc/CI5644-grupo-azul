package com.ci5644.trade.repositories

import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.jpa.repository.Modifying
import com.ci5644.trade.models.card.OwnershipEntity
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional;

@Repository
interface OwnershipRepository: JpaRepository<OwnershipEntity, Long> {

    fun existsByUserAndCard(user: Int, card: Int) : Boolean
    
    fun findByUserAndCard(user: Int, card: Int): OwnershipEntity

    fun findByUser(user: Int): List<OwnershipEntity>

    @Query("SELECT o.user FROM OwnershipEntity o WHERE o.card = :card AND o.quantity > 1")
    fun findUserByCard(card: Int): List<Int>

    @Query("SELECT o.card FROM OwnershipEntity o WHERE o.user = :user AND o.quantity > 1")
    fun findDuplicatedCards(user: Int, pageable: Pageable): List<Int>
    @Query("SELECT o.card FROM OwnershipEntity o WHERE o.user = :user AND o.quantity > 1")
    fun findDuplicatedCards(user: Int): List<Int>

    @Query("SELECT c.id FROM CardEntity c " +
            "LEFT JOIN OwnershipEntity o ON c.id = o.card AND o.user = :user WHERE o.id IS NULL")
    fun findNonOwnedCards(user: Int, pageable: Pageable): List<Int>

    @Query("SELECT c.id FROM CardEntity c " +
            "LEFT JOIN OwnershipEntity o1 ON (c.id = o1.card AND o1.user = :userOfferId AND o1.quantity > 1) " +
            "LEFT JOIN OwnershipEntity o2 ON (c.id = o2.card AND o2.user = :userReceiveId) WHERE o2.id IS NULL")
    fun findInterceptionCards(userReceiveId: Int, userOfferId: Int, pageable: Pageable): List<Int>

    @Query("SELECT u.username, count(o) FROM OwnershipEntity o JOIN UserEntity u ON u.id = o.user GROUP BY u.id ORDER BY count(o) DESC")
    fun findAllUsersWithPossessions(): List<List<Any>>
}