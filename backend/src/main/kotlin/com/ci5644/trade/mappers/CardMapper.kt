package com.ci5644.trade.mappers

import com.ci5644.trade.dto.CardDto
import com.ci5644.trade.entities.CardEntity
import org.springframework.stereotype.Service

@Service
class CardMapper: Mapper<CardDto, CardEntity> {
    override fun fromEntity(entity: CardEntity): CardDto {
        return CardDto(
            entity.id,
            entity.name,
            entity.number,
            entity.country,
            entity.position,
            entity.height,
            entity.weight
        )
    }

    override fun toEntity(domain: CardDto): CardEntity {
        return CardEntity(
            domain.id,
            domain.name,
            domain.number,
            domain.country,
            domain.position,
            domain.height,
            domain.weight
        )
    }
}