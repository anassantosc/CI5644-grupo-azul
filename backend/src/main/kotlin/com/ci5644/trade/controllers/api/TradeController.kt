package com.ci5644.trade.controllers.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TradeController {
    @GetMapping("/")
    fun helloDeck(): String = "Hello world"
}