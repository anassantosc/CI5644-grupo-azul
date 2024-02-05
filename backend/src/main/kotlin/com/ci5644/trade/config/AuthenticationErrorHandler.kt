package com.example.helloworld.config

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
/*
    TODO: this is not working as expected, it's returning 401 without any message
 */

@Component
@RequiredArgsConstructor
class AuthenticationErrorHandler : AuthenticationEntryPoint {
    private val objectMapper: ObjectMapper = ObjectMapper();

    @Throws(ServletException::class)
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        response.status = HttpStatus.UNAUTHORIZED.value();
        response.contentType = MediaType.APPLICATION_JSON_VALUE;
        response.characterEncoding = "UTF-8";
        response.writer.write(objectMapper.writeValueAsString("Unauthorized"));
    }
}