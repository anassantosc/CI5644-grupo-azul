package com.ci5644.trade.mappers

import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.models.user.UserEntity
import org.springframework.stereotype.Service

@Service
class UserMapper: Mapper<UserDto, UserEntity> {
    override fun fromEntity(entity: UserEntity): UserDto {
        return UserDto(
                entity.id,
                entity.password,
                entity.username
        )
    }

    override fun toEntity(domain: UserDto): UserEntity {
        return UserEntity(
                domain.id,
                domain.username,
                domain.password
        )
    }
}