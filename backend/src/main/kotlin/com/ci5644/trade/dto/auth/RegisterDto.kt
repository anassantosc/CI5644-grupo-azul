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
    @Size(min = 3)
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
)
