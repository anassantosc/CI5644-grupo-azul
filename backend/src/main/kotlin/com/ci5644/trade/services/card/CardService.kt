package com.ci5644.trade.services

import com.ci5644.trade.models.card.CardEntity
import com.ci5644.trade.repositories.CardRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

interface CardService {

    var cardRepository: CardRepository

    /**
     * Add a new card
     *
     */
    fun addCard(id: Int, playerName: String, number: Int, country: String, position: String, height: Double, weight: Double)

    fun deleteCard(id: Int)

    fun updateCard(card: CardEntity)

    fun getCard(id: Int) : CardEntity
}

@Service
class CardServiceImpl : CardService {

    override lateinit var cardRepository: CardRepository
    override fun addCard(id: Int, playerName: String, number: Int, country: String, position: String, height: Double, weight: Double) {
        var card = CardEntity(0,"",0,"","",0.0,0.0)

        card.id = id
        card.playerName = playerName
        card.number = number
        card.country = country
        card.position = position
        card.height = height
        card.weight = weight
        cardRepository.save(card)
    }

    override fun deleteCard(id: Int) {
        try {
            cardRepository.deleteById(id)
        } catch (e: Exception) {
            throw  Exception("Card doesn't exist")
        }
    }

    override fun updateCard(card: CardEntity) {
        try {
            if (cardRepository.existsById(card.id)) {
                cardRepository.save(card)
            } else {
                throw  Exception("Card not found")
            }
        } catch (e: Exception) {
            throw Exception("Error updating card: ${e.message}")
        }
    }

    override fun getCard(id: Int) : CardEntity {
        val optionalCard = cardRepository.findById(id)
        if (optionalCard.isPresent) {
            return optionalCard.get()
        } else {
            throw Exception("Card not found")
        }
    }
}