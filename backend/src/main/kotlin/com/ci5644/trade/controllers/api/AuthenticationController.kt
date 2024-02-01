package com.ci5644.trade.controllers.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import com.ci5644.trade.dto.LoginDto

@RestController
@RequestMapping("/api/auth")
class AuthenticationController {
    @PostMapping("/login")
    fun login(@RequestBody loginDto: LoginDto): LoginDto {
        return LoginDto(loginDto.username, loginDto.password)
    }


    @PostMapping("/register")
    fun register(@RequestBody registerDto: LoginDto): LoginDto {
        return LoginDto(registerDto.username, registerDto.password)
    }
}