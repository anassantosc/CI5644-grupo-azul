package com.ci5644.trade.dto

import com.ci5644.trade.models.user.UserEntity

data class UserDetailsDto(
    var username: String,
    var name: String,
    var email: String,
    var gender: String?,
) {
    companion object {
        fun fromEntity(entity: UserEntity): UserDetailsDto {
            return UserDetailsDto(
                username = entity.username,
                name = entity.name,
                email = entity.email,
                gender = entity.gender
            )
        }
    }

    fun validate(): String? {
        val errorMessage = StringBuilder()

        if (username.length < 5) {
            errorMessage.append("Username cannot be less than 5 characters. ")
        }

        return if (errorMessage.isNotEmpty()) errorMessage.toString() else null
    }

}
