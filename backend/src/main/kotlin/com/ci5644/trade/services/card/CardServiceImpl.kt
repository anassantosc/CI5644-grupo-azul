package com.ci5644.trade.services

import com.ci5644.trade.dto.CardDto
import com.ci5644.trade.mappers.CardMapper
import com.ci5644.trade.repositories.CardRepository
import org.springframework.stereotype.Service

@Service
class CardServiceImpl(
    private val cardRepository: CardRepository,
    private val cardMapper: CardMapper
): CardService {
    fun getCard(cardDto: CardDto): CardDto {
        val user = cardMapper.toEntity(cardDto)
        cardRepository.save(card)
        return cardMapper.fromEntity(card)
    }
}