package com.ci5644.trade.dto

import com.ci5644.trade.dto.UserDto

import org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

class UserDtoTest {

    @Autowired
    lateinit var userDto: UserDto

    @Test
    fun `UserDto should be able to be created`() {
        val userDto = UserDto(
            id = 1,
            username = "username",
            password = "password",
            name = "name",
            email = "email",
            gender = "test"
        )

        assertThat(userDto.id).isEqualTo(1)
        assertThat(userDto.username).isEqualTo("username")
        assertThat(userDto.password).isEqualTo("password")
        assertThat(userDto.name).isEqualTo("name")
        assertThat(userDto.email).isEqualTo("email")
        assertThat(userDto.gender).isEqualTo("test")
    }

    @Test
    fun `UserDto can have the value of 'gender' without defined` () {
        val userDto = UserDto(
            id = 1,
            username = "username",
            password = "password",
            name = "name",
            email = "email",
            gender = null
        )

        assertThat(userDto.id).isEqualTo(1)
        assertThat(userDto.username).isEqualTo("username")
        assertThat(userDto.password).isEqualTo("password")
        assertThat(userDto.name).isEqualTo("name")
        assertThat(userDto.email).isEqualTo("email")
        assertThat(userDto.gender).isNull()
    }
}