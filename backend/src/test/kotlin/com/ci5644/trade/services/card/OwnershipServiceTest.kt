package com.ci5644.trade
import com.ci5644.trade.services.card.OwnershipService


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

import org.junit.jupiter.api.DisplayName;


@WebMvcTest(OwnershipService::class)
class OwnershipServiceTest {

    @MockBean
    private lateinit var service: OwnershipService

    @Autowired
    private lateinit var mvc: MockMvc

    @Test
    @DisplayName("Getting cards from user 1")
    fun testGetCards() {
        var list = service.getCardsPerPage(1,1)
        Assertions.assertNotNull(list)
        //Assertions.assertEquals(3,list.size)
    }
    @Test
    @DisplayName("Getting most possessions")
    fun testGetMostPossessions() {
        var list = service.getMostPossessions(2)
        Assertions.assertNotNull(list)
        //Assertions.assertEquals(2,list.size)
    }
    @Test
    @DisplayName("Getting progress of user 1")
    fun testGetProgress() {
        var value = service.getUserProgress(1)
        Assertions.assertNotNull(value)
        //Assertions.assertEquals(1.09375,value)
    }
}

