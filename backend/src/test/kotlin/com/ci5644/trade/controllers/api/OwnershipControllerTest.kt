/*
package com.ci5644.trade.controllers.api
import com.ci5644.trade.controllers.api.OwnershipController
import com.ci5644.trade.services.auth.AuthorizationService
import com.ci5644.trade.services.user.UserService


import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions

import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.MvcResult
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import com.ci5644.trade.dto.auth.LoginDTO
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.AfterAll;

@WebMvcTest(OwnershipController::class)
class OwnershipControllerTest {

    @MockBean
    private lateinit var controller: OwnershipController

    //@Autowired
    //private lateinit var authService: AuthorizationService

    @MockBean
    private lateinit var userService: UserService

    @Autowired
    private lateinit var mvc: MockMvc

    private lateinit var result : MvcResult

    private lateinit var token : String

    @BeforeAll
    fun setup() {
        result = mvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"cesar\" ,\"password\":\"12345678\"}")
                .characterEncoding("utf-8"))
                .andReturn();
        token = result.getResponse().getContentAsString();
        Assertions.assertNotNull(token)
    }
    @Test
    @DisplayName("GET cards for user")
    fun testGetCards() {
        System.out.println();
        System.out.println("second test")
        println("aa")
        mvc.perform(get("/api/ownership/get-cards/1")
                .content("{\"authCookie\": $token ,\"pageable\":\"1\"}"))
    }
    @Test
    @DisplayName("GET progress for user")
    fun testGetProgress() {
        System.out.println();
        System.out.println("second test")
        println("aa")
        mvc.perform(get("/api/ownership/get-progress")
                .content("{\"authCookie\": $token}"))
    }

    @DisplayName("GET mundial progress for user")
    fun testGetMundialProgress() {
        mvc.perform(get("/api/ownership/get-mundial-progress/limit")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"limit\": \"2\"}")
                .characterEncoding("utf-8"))
    }

    @AfterAll
    fun tearDown() {

    }
}*/
