package com.ci5644.trade.repositories

import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import com.ci5644.trade.models.card.OwnershipEntity
import org.springframework.stereotype.Repository

@Repository
interface OwnershipRepository: JpaRepository<OwnershipEntity, Long> {
    fun existsByCardId(cardId: Int): Boolean
    fun existsByUserId(userId: Long): Boolean
    fun existsByUserIdAndCardId(userId: Long, cardId: Int): Boolean

    fun findByUserIdAndCardId(userId: Long, cardId: Int): OwnershipEntity

    fun findByCardId(cardId: Int): List<OwnershipEntity>
    fun findByUserId(userId: Long): List<OwnershipEntity>
    fun findByUserIdAndVisibility(userId: Long, visibility: Boolean, pageable: Pageable): Page<OwnershipEntity>
    override fun findAll(pageable: Pageable): Page<OwnershipEntity>

    @Query("SELECT o.userId, COUNT(o) FROM OwnershipEntity o GROUP BY o.userId")
    fun findAllUserIdsWithPossessions(): List<Pair<Long, Int>>
}