package com.ci5644.trade.dto.auth

import com.ci5644.trade.dto.auth.RegisterDTO

import org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

class RegisterDTOTests {

    @Autowired
    lateinit var registerDto: RegisterDTO

    @Test
    fun `RegisterDTO should be able to be created`() {
        val registerDto = RegisterDTO(
            username = "username",
            password = "password",
            name = "name",
            email = "email",
            gender = "test"
        )

        assertThat(registerDto.username).isEqualTo("username")
        assertThat(registerDto.password).isEqualTo("password")
        assertThat(registerDto.name).isEqualTo("name")
        assertThat(registerDto.email).isEqualTo("email")
        assertThat(registerDto.gender).isEqualTo("test")

    }

    @Test
    fun `RegisterDTO can have the value 'gender' without defined`() {
        val registerDto = RegisterDTO(
            username = "username",
            password = "password",
            name = "name",
            email = "email",
            gender = null
        )

        assertThat(registerDto.username).isEqualTo("username")
        assertThat(registerDto.password).isEqualTo("password")
        assertThat(registerDto.name).isEqualTo("name")
        assertThat(registerDto.email).isEqualTo("email")
        assertThat(registerDto.gender).isNull()
    }

    @Test
    fun `RegisterDTO can validate`() {
        val registerDto = RegisterDTO(
            username = "username",
            password = "password",
            name = "name",
            email = "email",
            gender = null
        )

        assertThat(registerDto.validate()).isNull()
    }

    @Test
    fun `RegisterDTO can validate username and return an error message`() {
        val registerDto = RegisterDTO(
            username = "user",
            password = "password",
            name = "name",
            email = "email",
            gender = null
        )

        assertThat(registerDto.validate()).isEqualTo("Username must be longer or equal to 5 characters. ")
    }

    @Test
    fun `RegisterDTO can validate password and return an error message`() {
        val registerDto = RegisterDTO(
            username = "username",
            password = "pass",
            name = "name",
            email = "email",
            gender = null
        )

        assertThat(registerDto.validate()).isEqualTo("Password must be longer or equal to 8 characters. ")
    }
}