package com.ci5644.trade.repositories

import com.ci5644.trade.models.card.CardEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface CardRepository: JpaRepository<CardEntity, Int> {


    /**
     * Add a new card
     *
     */
    fun addCard(id: Int, playerName: String, number: Int, country: String, position: String, height: Double, weight: Double)

    fun deleteCard(id: Int)

    fun updateCard(card: CardEntity)

    fun getCard(id: Int) : CardEntity


    @Query("SELECT c FROM CardEntity c")
    override fun findAll() : List<CardEntity>

}