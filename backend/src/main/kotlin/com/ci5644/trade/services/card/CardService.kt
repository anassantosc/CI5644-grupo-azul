package com.ci5644.trade.services

import com.ci5644.trade.dto.CardDto

interface CardService {
    fun getCard(cardDto: CardDto): CardDto
}