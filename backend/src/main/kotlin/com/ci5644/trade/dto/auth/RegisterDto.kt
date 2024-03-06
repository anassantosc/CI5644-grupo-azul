package com.ci5644.trade.dto.auth

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class RegisterDTO(
    @NotNull
    @NotEmpty
    @Size(max = 16)
    @Pattern(regexp = "^[A-Za-z0-9]+$")
    val username: String,

    @NotNull
    @NotEmpty
    @Size(min = 8)
    val password: String,

    @NotNull
    @NotEmpty
    @Size(max = 64)
    val name: String,

    @NotNull
    @NotEmpty
    @Size(max = 32)
    val email: String,

    val gender: String?
) {
    fun validate(): String? {
        val errorMessage = StringBuilder()

        if (username.length < 5) {
            errorMessage.append("Username must be longer or equal to 5 characters. ")
        }

        if (password.length < 8) {
            errorMessage.append("Password must be longer or equal to 8 characters. ")
        }

        return if (errorMessage.isNotEmpty()) errorMessage.toString() else null
    }
}