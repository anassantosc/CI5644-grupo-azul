package com.ci5644.trade.web.rest

import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.services.user.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UserResource(
        private val userService: UserService
) {
    @PostMapping
    fun createUser(@RequestBody userDto: UserDto): UserDto {
        return userService.createUser(userDto)
    }
}