package com.ci5644.trade.mappers

import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.models.user.UserEntity
import org.springframework.stereotype.Service

@Service
class UserMapper: Mapper<UserDto, UserEntity> {
    override fun fromEntity(entity: UserEntity): UserDto {
        val id = entity.id.toString()
        return UserDto(
                id,
                entity.username,
                entity.password,
        )
    }

    override fun toEntity(domain: UserDto): UserEntity {
        val id = domain.id.toLong()
        return UserEntity(
                id,
                domain.username,
                domain.password,
        )
    }
}