package com.ci5644.trade.repositories

import com.ci5644.trade.entities.CardEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CardRepository: CrudRepository<CardEntity, String>