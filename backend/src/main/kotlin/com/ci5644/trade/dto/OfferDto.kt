package com.ci5644.trade.dto

import com.ci5644.trade.models.card.OfferEntity

data class OfferDto(
    val id: Int,
    var userOffer: Int,
    var userReceive: Int,
    var cardOffer: Int,
    var cardReceive: Int,
    var status: String
) {
    companion object {
        fun fromEntity(entity: OfferEntity): OfferDto {
            return OfferDto(
                id = entity.id,
                userOffer = entity.userOffer,
                userReceive = entity.userReceive,
                cardOffer = entity.cardOffer,
                cardReceive = entity.cardReceive,
                status = entity.status.name
            )
        }
    }
}
