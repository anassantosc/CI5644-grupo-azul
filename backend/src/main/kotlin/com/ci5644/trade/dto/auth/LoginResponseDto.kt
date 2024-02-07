package com.ci5644.trade.dto.auth

data class LoginResponseDto (
  val access_token: String,
  val token_type: String,
  val scope: String,
  val expires_in: Int
)