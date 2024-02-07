package com.ci5644.trade.dto.auth

data class LoginBodyDto (
  val username: String,
  val password: String,
  val grant_type: String,
  val audience: String,
  val client_id: String,
  val client_secret: String
)