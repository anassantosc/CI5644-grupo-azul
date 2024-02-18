package com.ci5644.trade
import com.ci5644.trade.controllers.auth.AuthenticationController
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

@WebMvcTest(AuthenticationController::class)
class AuthenticationControllerTest {
    @MockBean
    private lateinit var controller: AuthenticationController

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
    @DisplayName("POST login user")
    fun testLogin() {
        result = mvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"cesar\" ,\"password\":\"12345678\"}")
                .characterEncoding("utf-8"))
                .andReturn();
        token = result.getResponse().getContentAsString();
        Assertions.assertNotNull(token)
    }

    @Test
    @DisplayName("POST register user")
    fun testRegister() {
        val json = "{\"username\": \"username\" ,\"password\":\"1234567\"," +
                "\"name\":\"Username\",\"email\":\"username@mail.com\"," +
                "\"gender\":\"F\"}"
        result = mvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .characterEncoding("utf-8"))
                .andReturn();
        token = result.getResponse().getContentAsString();
        Assertions.assertNotNull(token)
    }

    @DisplayName("GET logout user")
    fun testLogout() {
        mvc.perform(get("/auth/logout"))
    }

    @AfterAll
    fun tearDown() {

    }
}
