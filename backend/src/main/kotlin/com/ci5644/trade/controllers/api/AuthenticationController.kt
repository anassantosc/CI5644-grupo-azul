package com.ci5644.trade.controllers.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import org.springframework.web.client.RestClient
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType

import com.ci5644.trade.dto.auth.LoginDto
import com.ci5644.trade.dto.auth.LoginBodyDto
import com.ci5644.trade.dto.auth.LoginResponseDto

@RestController
@RequestMapping("/api/auth")
class AuthenticationController {
    @Value("\${okta.oauth2.audience}")
    private lateinit var audience: String

    @Value("\${okta.oauth2.client-id}")
    private lateinit var clientId: String

    @Value("\${okta.oauth2.client-secret}")
    private lateinit var clientSecret: String

    @Value("\${okta.oauth2.issuer}")
    private lateinit var baseUrl: String
   

    @PostMapping("/login")
    fun login(@RequestBody loginDto: LoginDto): LoginResponseDto? {
        val restClient = RestClient.create(baseUrl)

        val login = LoginBodyDto(loginDto.username, loginDto.password, "password", audience, clientId, clientSecret)

        return restClient.post()
            .uri("/oauth/token")
            .contentType(MediaType.APPLICATION_JSON)
            .body(login)
            .retrieve()
            .body(LoginResponseDto::class.java)
    }


    @PostMapping("/register")
    fun register(@RequestBody registerDto: LoginDto): LoginDto {
        return LoginDto(registerDto.username, registerDto.password)
    }
}