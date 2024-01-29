package com.ci5644.trade.web.rest

import com.ci5644.trade.dto.CardDto
import com.ci5644.trade.models.card.CardEntity
import com.ci5644.trade.services.CardService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class CardResource(
    private val cardService: CardService
) {
    @GetMapping("/{id}")
    fun getCard(@PathVariable id: Int): CardDto {
        val cardEntity = cardService.getCard(id)
        return entityToDto(cardEntity)
    }

    private fun entityToDto(cardEntity: CardEntity) : CardDto {
        return CardDto(
            id = cardEntity.id,
            playerName = cardEntity.playerName,
            number = cardEntity.number,
            position = cardEntity.position,
            country = cardEntity.country,
            height = cardEntity.height,
            weight = cardEntity.weight
        )
    }
}