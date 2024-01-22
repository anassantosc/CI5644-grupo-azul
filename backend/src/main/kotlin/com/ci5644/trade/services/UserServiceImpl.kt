package com.ci5644.trade.services

import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.mappers.UserMapper
import com.ci5644.trade.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
        private val userRepository: UserRepository,
        private val userMapper: UserMapper
): UserService {
    override fun createUser(userDto: UserDto): UserDto {
        val user = userMapper.toEntity(userDto)
        userRepository.save(user)
        return userMapper.fromEntity(user)
    }
}