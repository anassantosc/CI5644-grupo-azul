package com.ci5644.trade.dto

import com.ci5644.trade.models.user.UserEntity

data class UserDto(
    val id: Long,
    var password: String,
    var username: String,
    var name: String,
    var email: String,
    var gender: String?,
) {
    companion object {
        fun fromEntity(entity: UserEntity): UserDto {
            return UserDto(
                id = entity.id,
                username = entity.username,
                password = entity.password,
                name = entity.name,
                email = entity.email,
                gender = entity.gender
            )
        }
    }
}
