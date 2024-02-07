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
import kotlin.random.Random


@Service
class CardService  {

    @Autowired
    lateinit var cardRepository: CardRepository

    fun addCard(id: Int, playerName: String, country: String, shirtNumber: Int, position: String, height: Double, weight: Double) {
        var card = CardEntity(0,"","",0,"",0.0,0.0)

        card.id = id
        card.playerName = playerName
        card.country = country
        card.shirtNumber = shirtNumber
        card.position = position
        card.height = height
        card.weight = weight
        cardRepository.save(card)
    }


    fun removeCard(id: Int) {
        val optionalCard = cardRepository.findById(id)
        

        if (optionalCard.isPresent) {
            val card = optionalCard.get()
            cardRepository.delete(card)
        } else {
            throw RuntimeException("CardEntity with id $id was not found")
        }
    }

    fun changePlayerName(id: Int, newPlayerName: String) {
        val optionalCard = cardRepository.findById(id)


        if (optionalCard.isPresent) {
            var card = optionalCard.get()

            card.playerName = newPlayerName
        } else {
            throw RuntimeException("CardEntity was not found")
        }
    }



    fun changeCountry(id: Int, newCountry: String) {
        val optionalCard = cardRepository.findById(id)


        if (optionalCard.isPresent) {
            var card = optionalCard.get()

            card.country = newCountry 
        } else {
            throw RuntimeException("CardEntity was not found")
        }
    }



    fun changeShirtNumber(id: Int, newShirtNumber: Int) {
        val optionalCard = cardRepository.findById(id)


        if (optionalCard.isPresent) {
            var card = optionalCard.get()

            card.shirtNumber = newShirtNumber
        } else {
            throw RuntimeException("CardEntity was not found")
        }
    }

  

    fun changePosition(id: Int, newPosition: String) {
        val optionalCard = cardRepository.findById(id)


        if (optionalCard.isPresent) {
            var card = optionalCard.get()

            card.position = newPosition
        } else {
            throw RuntimeException("CardEntity was not found")
        }
    }
    

    fun changeHeight(id: Int, newHeight: Double) {
        val optionalCard = cardRepository.findById(id)


        if (optionalCard.isPresent) {
            var card = optionalCard.get()

            card.height = newHeight
        } else {
            throw RuntimeException("CardEntity was not found")
        }
    }



    fun changeWeight(id: Int, newWeight: Double) {
        val optionalCard = cardRepository.findById(id)


        if (optionalCard.isPresent) {
            var card = optionalCard.get()

            card.weight = newWeight
        } else {
            throw RuntimeException("CardEntity was not found")
        }
    }


    fun getPackage() : List<CardEntity> {
        var listOfIds = mutableListOf<Int>()

        for (i in 0..5) {
            val id = Random.nextInt(1, 641)
            listOfIds.add(id)
        }
        
        return cardRepository.findPackage(listOfIds)
    }

}
