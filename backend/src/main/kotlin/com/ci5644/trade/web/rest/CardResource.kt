package com.ci5644.trade.web.rest

import com.ci5644.trade.dto.CardDto
import com.ci5644.trade.services.CardService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class CardResource(
    private val cardService: CardService
) {
    @PostMapping
    fun getCard(@RequestBody cardDto: CardDto): CardDto {
        return cardService.getCard(cardDto)
    }
}