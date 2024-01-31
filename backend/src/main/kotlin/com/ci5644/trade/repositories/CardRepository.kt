package com.ci5644.trade.repositories

import com.ci5644.trade.models.card.CardEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface CardRepository: JpaRepository<CardEntity, Int> {

    //override fun findById(id: Int) : Optional<CardEntity>

    override fun existsById(id: Int) : Boolean

    @Query("SELECT c FROM CardEntity c")
    override fun findAll() : List<CardEntity>

}