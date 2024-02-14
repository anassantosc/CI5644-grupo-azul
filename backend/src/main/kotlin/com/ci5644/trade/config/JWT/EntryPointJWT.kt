package com.ci5644.trade.config.JWT


import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.io.IOException
import org.slf4j.Logger
import org.slf4j.LoggerFactory

/**
 * Punto de entrada básico
 */
@Component
class EntryPointJWT : AuthenticationEntryPoint {


    private val logger = LoggerFactory.getLogger(EntryPointJWT::class.java)

    @Throws(IOException::class, ServletException::class)
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        println("10")
        logger.info("10")
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.message)
    }
}
