package com.ci5644.trade.config.JWT

import com.ci5644.trade.services.user.UserService
import com.ci5644.trade.config.SecurityConstants
import io.jsonwebtoken.JwtException
import java.io.IOException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

/**
 * Custom JWT filter for handling JWT authentication.
 * This filter intercepts incoming requests, extracts JWT token from cookies,
 * validates the token, and sets authentication for the user.
 */
@Component
class JWTFilter(private var userService: UserService) : OncePerRequestFilter() {

    private val logger = LoggerFactory.getLogger(JWTFilter::class.java)

    /**
     * Performs filtering of incoming requests.
     * Extracts JWT token from cookies, validates it, and sets user authentication if valid.
     * @param request HttpServletRequest - The HTTP request made by the user.
     * @param response HttpServletResponse - The HTTP response sent to the user.
     * @param filterChain FilterChain - Chain of filters to continue processing the request.
     * @throws ServletException if any servlet-related errors occur during the processing of the request.
     * @throws IOException if an I/O error occurs while sending the response.
     */
    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        logger.info("Starting JWT filter")
        // Search in cookies for JWT token.
        if (request.cookies != null) {
            val jwtCookie = findJWTCookie(request)

            // If JWT cookie is found, attempt to authenticate the user.
            if (jwtCookie != null) {
                val jwtToken: String = jwtCookie.value
                try {
                    if (JWTSecurityUtils.validateToken(jwtToken, SecurityConstants.JWT_AUTH_SECRET)) {
                        val username: String = JWTSecurityUtils.getAuthUserFromJWT(jwtToken)
                        setUserAuth(request, username)
                    }
                } catch (e: JwtException) {
                    logger.error("JWT Exception: ${e.message}")
                    response.status = HttpServletResponse.SC_UNAUTHORIZED
                    response.writer.write("Error: ${e.message}")
                    return
                } catch (e: Exception) {
                    logger.error("error: ${e.message}")
                    response.status = HttpServletResponse.SC_NOT_FOUND
                    response.writer.write("Resource not found: ${e.message}")
                }
            }
        }

        logger.info("Finishing JWT filter")
        filterChain.doFilter(request, response)
    }

    /**
     * Determines whether this filter should be applied to the given request.
     * This filter is applied to requests that do not contain "/auth/" in the URL and contain "/api/".
     * @param request HttpServletRequest - The HTTP request made by the user.
     * @return Boolean - true if the filter should not be applied, false otherwise.
     */
    @Throws(ServletException::class)
    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        return request.requestURL.toString().contains("/auth/") ||
                !request.requestURL.toString().contains("/api/")
    }

    /**
     * Finds JWT cookie in the request.
     * This method searches for a JWT cookie in the incoming request.
     * @param request HttpServletRequest - The HTTP request made by the user.
     * @return Cookie? - The JWT cookie if found, otherwise null.
     */
    private fun findJWTCookie(request: HttpServletRequest): Cookie? {
        for (cookie: Cookie in request.cookies) {
            if (cookie.name != SecurityConstants.AUTH_COOKIE_NAME) continue
            return cookie
        }
        return null
    }

    /**
     * Sets user authentication in the security context.
     * This method loads user details by username, creates an authentication token,
     * and sets it in the security context.
     * @param request HttpServletRequest - The HTTP request made by the user.
     * @param username String - The username extracted from the JWT token.
     */
    private fun setUserAuth(request: HttpServletRequest, username: String) {
        try {
            val userDetails: UserDetails = userService.loadUserByUsername(username)

            val auth = UsernamePasswordAuthenticationToken(
                userDetails.username,
                userDetails.password,
                userDetails.authorities
            )
            auth.details = WebAuthenticationDetailsSource().buildDetails(request)
            val context = SecurityContextHolder.createEmptyContext()

            context.authentication = auth
            SecurityContextHolder.setContext(context)
        } catch (error: Exception) {
            throw error
        }
    }
}
