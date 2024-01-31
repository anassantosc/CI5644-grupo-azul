package com.ci5644.trade.services.card

import com.ci5644.trade.models.card.CardEntity
import com.ci5644.trade.repositories.CardRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Example
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.repository.query.FluentQuery
import org.springframework.stereotype.Service
import java.util.*
import java.util.function.Function


@Service
class CardService  {

    @Autowired
    lateinit var cardRepository: CardRepository

    fun addCard(id: Int, playerName: String, country: String, position: String, height: Double, weight: Double) {
        var card = CardEntity(0,"","","",0.0,0.0)

        card.id = id
        card.playerName = playerName
        card.country = country
        card.position = position
        card.height = height
        card.weight = weight
        cardRepository.save(card)
    }

    /*

    fun deleteCard(id: Int) {
        try {
            cardRepository.deleteById(id)
        } catch (e: Exception) {
            throw  Exception("Card doesn't exist")
        }
    }
     

    fun updateCard(card: CardEntity) {
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

     fun getCard(id: Int) : CardEntity {
        val optionalCard = cardRepository.findById(id)
        if (optionalCard.isPresent) {
            return optionalCard
        } else {
            throw Exception("Card not found")
        }
    }
    */

}

