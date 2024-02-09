package com.ci5644.trade.config.JWT

import com.ci5644.trade.services.user.UserService
import com.ci5644.trade.config.SecurityConstants
import io.jsonwebtoken.JwtException
import java.io.IOException
import org.slf4j.Logger
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
 * Implementación del filtro JWT.
 * Autentica un usuario utilizando una cookie JWT
 * generada por el servidor.
 */
@Component
class JWTFilter : OncePerRequestFilter() {

    //private val logger: Logger = LogManager.getLogger()

    @Autowired
    private lateinit var userService: UserService

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        logger.info("Starting JWT filter")
        var jwtCookie: Cookie?
        // Buscamos en las cookies.
        if (request.cookies != null) {
            jwtCookie = findJWTCookie(request)

            // Si encontramos una cookie JWT, intentamos autenticar al usuario
            if (jwtCookie != null) {
                val jwtToken: String = jwtCookie.value
                try {
                    if (JWTSecurityUtils.validateToken(jwtToken, SecurityConstants.JWT_AUTH_SECRET)) {
                        val username: String = JWTSecurityUtils.getAuthUserFromJWT(jwtToken)
                        setUserAuth(request, username)
                    }
                } catch (e: JwtException) {
                    logger.error("JWT Exception: ${e.message}")
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
                    return
                }
            }
        }

        logger.info("Finishing JWT filter")
        filterChain.doFilter(request, response)
    }

    @Throws(ServletException::class)
    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        return request.requestURL.toString().contains("/admin/") ||
                !request.requestURL.toString().contains("/api/")
    }

    /**
     * Recupera la cookie de autenticación/autorización JWT
     * de un HttpServletRequest.
     *
     * @param request Solicitud para recuperar la cookie.
     * @return La cookie JWT en caso de que la solicitud la contenga/Null en caso contrario.
     */
    private fun findJWTCookie(request: HttpServletRequest): Cookie? {
        for (cookie: Cookie in request.cookies) {
            if (cookie.name != SecurityConstants.AUTH_COOKIE_NAME) continue
            return cookie
        }
        return null
    }

    /**
     * Establece el contexto de autenticación del usuario.
     *
     * @param request Solicitud realizada al sistema.
     */
    private fun setUserAuth(request: HttpServletRequest, username: String) {
        val userDetails: UserDetails = userService.loadUserByUsername(username)

        val auth = UsernamePasswordAuthenticationToken(
            userDetails.username,
            userDetails.password
        )

        auth.details = WebAuthenticationDetailsSource().buildDetails(request)

        SecurityContextHolder.getContext().authentication = auth
    }
}
