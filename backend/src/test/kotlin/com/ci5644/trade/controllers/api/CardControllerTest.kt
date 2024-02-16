package com.ci5644.trade
import com.ci5644.trade.controllers.api.CardController


import org.springframework.test.web.servlet.MockMvc
import org.springframework.boot.test.mock.mockito.MockBean
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.web.client.RestTemplate;


@WebMvcTest(CardController::class)
class CardControllerTest {

    @MockBean
    private lateinit var controller: CardController

    @Autowired
    private lateinit var mvc: MockMvc

    // @Test
    // fun testPage() {

    // }
}

