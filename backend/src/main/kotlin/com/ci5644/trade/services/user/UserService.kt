package com.ci5644.trade.services.user

import com.ci5644.trade.dto.UserDto

interface UserService {
    fun createUser(userDto: UserDto): UserDto
}