package com.ci5644.trade.repositories

import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import com.ci5644.trade.models.card.OwnershipEntity
import org.springframework.stereotype.Repository

@Repository
interface OwnershipRepository: JpaRepository<OwnershipEntity, Long> {
    fun existsByCard(card: Int): Boolean
    fun existsByUser(user: Long): Boolean
    fun existsByUserAndCard(user: Long, card: Int): Boolean

    fun findByUserAndCard(user: Long, card: Int): OwnershipEntity

    fun findByCard(card: Int): List<OwnershipEntity>
    fun findByUser(user: Long): List<OwnershipEntity>
    fun findByUserAndVisibility(user: Long, visibility: Boolean, pageable: Pageable): Page<OwnershipEntity>
    override fun findAll(pageable: Pageable): Page<OwnershipEntity>

    @Query("SELECT u.username, count(o) FROM OwnershipEntity o JOIN UserEntity u ON u.id = o.user GROUP BY u.id ORDER BY count(o) DESC")
    fun findAllUsersWithPossessions(): List<List<Any>>
}