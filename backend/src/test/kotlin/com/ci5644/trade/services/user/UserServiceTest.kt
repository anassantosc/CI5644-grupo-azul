/*package com.ci5644.trade
import com.ci5644.trade.services.user.UserService
import com.ci5644.trade.dto.UserDto

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


@WebMvcTest(UserService::class)
class UserServiceTest {

    @MockBean
    private lateinit var service: UserService

    @Autowired
    private lateinit var mvc: MockMvc

    @Test
    fun testLoadUserByUsername() {
        val res = service.loadUserByUsername("cesar")
        Assertions.assertNull(res)
    }
    @Test
    fun testEditUser(){
        val details : UserDto = UserDto(1,"cesar","cesar","cesar","cesar","cesar")
        val res = service.editUser(details)
        Assertions.assertNotNull(res)
    }
}*/

