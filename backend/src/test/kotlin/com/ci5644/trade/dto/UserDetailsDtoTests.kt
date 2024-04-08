package com.ci5644.trade.dto

import com.ci5644.trade.dto.UserDetailsDto

import org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

class UserDetailsTest {

    @Autowired
    lateinit var userDetailsDto: UserDetailsDto

    @Test
    fun `UserDetailsDto should be able to be created`() {
        val userDetailsDto = UserDetailsDto(
            username = "username",
            name = "name",
            email = "email",
            gender = "test",
            cardNumber = null,
            expirationDate = null,
            cvv = null
        )

        assertThat(userDetailsDto.username).isEqualTo("username")
        assertThat(userDetailsDto.name).isEqualTo("name")
        assertThat(userDetailsDto.email).isEqualTo("email")
        assertThat(userDetailsDto.gender).isEqualTo("test")
    }

    @Test
    fun `UserDetailsDto can have the value of 'gender' without defined`() {
        val userDetailsDto = UserDetailsDto(
            username = "username",
            name = "name",
            email = "email",
            gender = null,
            cardNumber = null,
            expirationDate = null,
            cvv = null
        )

        assertThat(userDetailsDto.username).isEqualTo("username")
        assertThat(userDetailsDto.name).isEqualTo("name")
        assertThat(userDetailsDto.email).isEqualTo("email")
        assertThat(userDetailsDto.gender).isNull()
    }

    @Test
    fun `UserDetailsDto can validate`() {
        val userDetailsDto = UserDetailsDto(
            username = "username",
            name = "name",
            email = "email",
            gender = null,
            cardNumber = null,
            expirationDate = null,
            cvv = null
        )

        assertThat(userDetailsDto.validate()).isNull()
    }

    @Test
    fun `UserDetailsDto can validate usernamme and return an error message`() {
        val userDetailsDto = UserDetailsDto(
            username = "user",
            name = "name",
            email = "email",
            gender = null,
            cardNumber = null,
            expirationDate = null,
            cvv = null
        )

        assertThat(userDetailsDto.validate()).isEqualTo("El nombre de usuario debe tener al menos 5 caracteres. \n")
    }
}
