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

    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END " +
            "FROM OfferEntity o " +
            "WHERE o.userOffer = :userOfferId " +
            "AND o.userReceive = :userReceiveId " +
            "AND o.cardOffer = :cardOffer " +
            "AND o.cardReceive = :cardReceive " +
            "AND o.status IN ('PENDING', 'COUNTEROFFER')")
    fun existByUsers(userOfferId: Int, userReceiveId: Int, cardOffer: Int, cardReceive: Int): Boolean

    fun findById(id: Int): OfferEntity?

    fun findByUserOffer(user: Int): List<OfferEntity>

    fun findByUserReceive(user: Int): List<OfferEntity>

    fun findByCardOffer(card: Int): List<OfferEntity>

    fun findByCardReceive(card: Int): List<OfferEntity>

    @Query("SELECT o FROM OfferEntity o WHERE (o.userOffer = :user AND o.cardReceive = :card) OR (o.userReceive = :user AND o.cardOffer = :card)")
    fun findByUserAndCard(user: Int, card: Int): List<OfferEntity>

    @Query("SELECT o FROM OfferEntity o WHERE o.status IN ('PENDING', 'COUNTEROFFER') AND userReceive = :user")
    fun findAvailableByUserReceive(user: Int, pageable: Pageable): List<OfferEntity>

    @Query("SELECT o FROM OfferEntity o")
    fun findAllOffers(): List<OfferEntity>
}