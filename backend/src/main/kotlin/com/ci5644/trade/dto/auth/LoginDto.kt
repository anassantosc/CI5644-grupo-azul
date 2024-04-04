package com.ci5644.trade.dto.auth

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class LoginDTO(
    @NotNull
    @NotEmpty
    @Size(max = 32)
    val username: String,
    val password: String
)
