package com.ci5644.trade
import com.ci5644.trade.controllers.api.OwnershipController


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


@WebMvcTest(OwnershipController::class)
class OwnershipControllerTest {

    @MockBean
    private lateinit var controller: OwnershipController

    @Autowired
    private lateinit var mvc: MockMvc

    @Test
    fun testGetCard() {
        val a = "{\"id\":23,\"playerName\":\"Yard Omar\",\"country\":\"Argentina\",\"shirtNumber\":3,\"position\":\"por\",\"height\":2.04,\"weight\":85.64}"
        val b = "{\"id\":24,\"playerName\":\"Clerc Stieger\",\"country\":\"Argentina\",\"shirtNumber\":4,\"position\":\"li\",\"height\":1.99,\"weight\":89.73}"
        val c = "{\"id\":25,\"playerName\":\"Marlow Conley\",\"country\":\"Argentina\",\"shirtNumber\":5,\"position\":\"def\", \"height\":1.95,\"weight\":88.62}"
        val data = "{\"cards\":[$a,$b,$c],\"user id\":1}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-cards/1/1")
                .contentType("application/json")
                .content(data))
    }

    @Test
    fun testGetCardNonExistentUser() {
        val data = "{\"cards\":[],\"user id\":45646}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-cards/45646/1")
                .contentType("application/json")
                .content(data))
    }

    @Test
    fun testGetProgress() {
        val data = "{\"progress\":1.09375,\"user id\":1}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-progress/1")
                .contentType("application/json")
                .content(data))
    }

    @Test
    fun testGetProgressNonExistentUser() {
        val data = "{\"progress\":0.0,\"user id\":789}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-progress/789")
                .contentType("application/json")
                .content(data))
    }

    @Test
    fun testGetMundialProgress() {
        val data = "{\"mundial progress\":[{\"first\":\"Cesar\",\"second\":3.2812498},{\"first\":\"Ana\",\"second\":1.25}],\"limit\":2}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-mundial-progress/limit?limit=2")
                .contentType("application/json")
                .content(data))
    }

    @Test
    fun testGetMundialProgressLimit() {
        val data = "{\"mundial progress\":[{\"first\":\"Cesar\",\"second\":3.2812498},{\"first\":\"Ana\",\"second\":1.25},{\"first\":\"Simon\",\"second\":1.09375}],\"limit\":12456}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-mundial-progress/limit?limit=12456")
                .contentType("application/json")
                .content(data))
    }

    @Test
    fun testGetMundialProgressLimitZero() {
        val data = "{\"mundial progress\":[],\"limit\":0}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-mundial-progress/limit?limit=0")
                .contentType("application/json")
                .content(data))
    }

    @Test
    fun testGetMundialProgressDefault() {
        val data = "{\"mundial progress\":[{\"first\":\"Cesar\",\"second\":3.2812498},{\"first\":\"Ana\",\"second\":1.25},{\"first\":\"Simon\",\"second\":1.09375}],\"limit\":3}"
        mvc.perform(MockMvcRequestBuilders.get("/api/ownership/get-mundial-progress/limit")
                .contentType("application/json")
                .content(data))
    }

}

