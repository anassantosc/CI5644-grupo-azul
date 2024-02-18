package com.ci5644.trade
import com.ci5644.trade.controllers.api.UserController
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

@WebMvcTest(UserController::class)
class UserControllerTest {
    @MockBean
    private lateinit var controller: UserController

    //@Autowired
    //private lateinit var authService: AuthorizationService

    @MockBean
    private lateinit var userService: UserService

    @Autowired
    private lateinit var mvc: MockMvc

    private lateinit var result: MvcResult

    private lateinit var token: String

    @BeforeAll
    fun setup() {

    }

    @Test
    @DisplayName("GET user details")
    fun testGetUserDetails() {
        mvc.perform(get("/api/user/detail"))
    }

    @Test
    @DisplayName("POST edit user")
    fun testEditUser() {
        val json = "{\"id\": \"4\", \"username\": \"username\" ,\"password\":\"1234567\", " +
                "\"name\":\"Username\",\"email\":\"username@mail.com\",\"gender\":\"F\"}"
        result = mvc.perform(post("/api/user/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .characterEncoding("utf-8"))
                .andReturn();
        token = result.getResponse().getContentAsString();
        Assertions.assertNotNull(token)
    }

    @AfterAll
    fun tearDown() {
    }
}
