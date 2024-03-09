package com.ci5644.trade.repositories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.jpa.repository.Modifying
import org.springframework.stereotype.Repository
import com.ci5644.trade.models.card.OfferEntity
import com.ci5644.trade.models.card.OfferStatus
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import org.springframework.transaction.annotation.Transactional

@Repository
interface OfferRepository: JpaRepository<OfferEntity, Long> {

    fun findById(id: Int): OfferEntity

    fun findByUserOffer(user: Int): List<OfferEntity>

    fun findByUserReceive(user: Int): List<OfferEntity>

    fun findByCardOffer(card: Int): List<OfferEntity>

    fun findByCardReceive(card: Int): List<OfferEntity>

    @Query("SELECT o FROM OfferEntity o WHERE (o.userOffer = :user AND o.cardReceive = :card) OR (o.userReceive = :user AND o.cardOffer = :card)")
    fun findByUserAndCard(user: Int, card: Int): List<OfferEntity>

    //fun findByUserOfferAndCardOfferAndCardReceive(user: Int, cardOffer: Int, cardReceive: Int): List<OfferEntity>

    @Query("SELECT o FROM OfferEntity o WHERE (o.status = 'PENDING' OR o.status = 'COUNTEROFFER') AND userReceive = :user")
    fun findPendingByUserReceive(user: Int, pageable: Pageable): List<OfferEntity>

    @Modifying
    @Transactional
    @Query("DELETE FROM OfferEntity o WHERE o.id = :id")
    fun deleteById(id: Int)

    @Query("SELECT o FROM OfferEntity o")
    fun findAllOffers(): List<OfferEntity>

}