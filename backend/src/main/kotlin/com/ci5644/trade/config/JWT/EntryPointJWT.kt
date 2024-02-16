package com.ci5644.trade.config.JWT


import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.io.IOException
import org.slf4j.LoggerFactory


/**
 * Custom authentication entry point for JWT authentication.
 * This class handles authentication exceptions by sending an unauthorized response with an error message.
 */
@Component
class EntryPointJWT : AuthenticationEntryPoint {

    private val logger = LoggerFactory.getLogger(EntryPointJWT::class.java)

    /**
     * Called when an unauthenticated user attempts to access a secured resource.
     * Logs the authentication exception and sends an unauthorized response with an error message.
     * @param request HttpServletRequest - The HTTP request made by the user.
     * @param response HttpServletResponse - The HTTP response sent to the user.
     * @param authException AuthenticationException - The exception that occurred during authentication.
     * @throws IOException if an I/O error occurs while sending the response.
     * @throws ServletException if any servlet-related errors occur during the processing of the request.
     */
    @Throws(IOException::class, ServletException::class)
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        val errorMessage = authException.message
        if (errorMessage != null && errorMessage.toLowerCase().contains("bad credentials")) {
            response.sendError(HttpServletResponse.SC_CONFLICT, errorMessage)
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, errorMessage)
        }
        logger.error("Authentication exception: ${authException.message}")
    }
}
