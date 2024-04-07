package com.ci5644.trade.dto

import com.ci5644.trade.models.card.CardEntity

data class CardDto(
    val id: Int,
    val playerName: String,
    val country: String,
    val shirtNumber: Int,
    val position: String,
    val height: Double,
    val weight: Double
) {
    companion object {
        fun fromEntity(entity: CardEntity): CardDto {
            return CardDto(
                id = entity.id,
                playerName = entity.playerName,
                country = entity.country,
                shirtNumber = entity.shirtNumber,
                position = entity.position,
                height = entity.height,
                weight = entity.weight
            )
        }
    }
}
