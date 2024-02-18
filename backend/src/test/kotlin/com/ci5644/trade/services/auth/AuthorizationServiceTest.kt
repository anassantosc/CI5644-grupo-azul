package com.ci5644.trade
import com.ci5644.trade.services.auth.AuthorizationService
import com.ci5644.trade.services.user.UserService
import com.ci5644.trade.dto.auth.RegisterDTO

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


@WebMvcTest(AuthorizationService::class)
class AuthorizationServiceTest {

    @MockBean
    private lateinit var service: AuthorizationService

    @MockBean
    private lateinit var userService: UserService

    @Autowired
    private lateinit var mvc: MockMvc

    @Test
    fun testRegister() {
        val reg = RegisterDTO("nuevousuario2","12345678","Usuario","user@mail.to","F")
        val res = service.registerUser(reg)
        Assertions.assertNull(res)
    }
    @Test
    fun testGetUser() {
        val res = service.retrieveUser("cesar")
    }
    @Test
    @DisplayName("Logging user")
    fun testLogin() {
        var value = service.loginUser("cesar", "12345678")
        Assertions.assertNull(value)
    }
}

