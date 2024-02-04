package com.ci5644.trade.controllers.api

import com.ci5644.trade.dto.CardDto
import com.ci5644.trade.models.card.CardEntity
import com.ci5644.trade.services.card.CardService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class CardController {

    @Autowired
    private lateinit var cardService: CardService

    /*
    @GetMapping("/{id}")
    fun getCard(@PathVariable id: Int): CardDto {
        val cardEntity = cardService.findById(id)
        return entityToDto(cardEntity)
    }

    private fun entityToDto(cardEntity: CardEntity) : CardDto {
        return CardDto(
            id = cardEntity.id,
            playerName = cardEntity.playerName,
            position = cardEntity.position,
            country = cardEntity.country,
            height = cardEntity.height,
            weight = cardEntity.weight
        )
    }
    */
}
