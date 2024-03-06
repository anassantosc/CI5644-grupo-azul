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

    fun findByUserAndCard(user: Int, card: Int): OwnershipEntity

    fun findByUser(user: Int): List<OwnershipEntity>
    fun findByUserWithPagination(user: Int, pageable: Pageable): Page<OwnershipEntity>
    override fun findAll(pageable: Pageable): Page<OwnershipEntity>

    @Query("SELECT o.user FROM OwnershipEntity o WHERE o.card = :card AND o.quantity > 1")
    fun findUserByCard(card: Int): List<Int>

    @Query("SELECT o.card FROM OwnershipEntity o WHERE o.user = :user AND o.quantity > 1")
    fun findDuplicatedCards(user: Int, pageable: Pageable): List<Int>

    @Query("SELECT u.username, count(o) FROM OwnershipEntity o JOIN UserEntity u ON u.id = o.user GROUP BY u.id ORDER BY count(o) DESC")
    fun findAllUsersWithPossessions(): List<List<Any>>
}