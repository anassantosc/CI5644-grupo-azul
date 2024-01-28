package com.ci5644.trade.repositories

import com.ci5644.trade.entities.CardEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CardRepository: JpaRepository<CardEntity, String> {

    fun findCardById(cardId: Int) : CardRepository

    @Query("SELECT * FROM CardEntity")
    fun findAll() : List<CarEntity>

}