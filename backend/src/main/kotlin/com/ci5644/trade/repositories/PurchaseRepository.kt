package com.ci5644.trade.repositories

import com.ci5644.trade.models.card.PurchaseEntity
import org.springframework.stereotype.Repository
import org.springframework.data.jpa.repository.JpaRepository

@Repository
interface PurchaseRepository: JpaRepository<PurchaseEntity, Long> {
    fun findById(id: Int): PurchaseEntity?
}