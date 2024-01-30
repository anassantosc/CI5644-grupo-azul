package com.ci5644.trade.mappers

import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.models.user.UserEntity
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@SpringBootTest(classes = [UserMapper::class])
class UserMapperTests {

    @Autowired
    private lateinit var userMapper: UserMapper

    @Test
    fun testFromEntity() {
        val userEntity = UserEntity(616L, "Peter", "Parker")
        val userDto = userMapper.fromEntity(userEntity)
        assertEquals(userEntity.id, userDto.id)
        assertEquals(userEntity.username, userDto.username)
        assertEquals(userEntity.password, userDto.password)
    }

    @Test
    fun testToEntity() {
        val userDto = UserDto(456L, "María", "García")
        val userEntity = userMapper.toEntity(userDto)
        assertEquals(userDto.id, userEntity.id)
        assertEquals(userDto.username, userEntity.username)
        assertEquals(userDto.password, userEntity.password)
    }
}