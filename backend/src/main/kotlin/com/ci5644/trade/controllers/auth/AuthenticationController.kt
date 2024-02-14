package com.ci5644.trade.controllers.auth

import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.dto.auth.LoginDTO
import com.ci5644.trade.dto.auth.RegisterDTO
import com.ci5644.trade.services.AuthorizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import javax.naming.AuthenticationException
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

/**
 * API que contiene todos los puntos finales de autorización y autenticación
 */
@RestController
@RequestMapping("/auth")
class AuthenticationController {

    @Autowired
    private lateinit var authService: AuthorizationService

    /**
     * Inicia sesión del usuario
     *
     * @param log Información de inicio de sesión del usuario que intenta autenticarse
     * @return Si el inicio de sesión tiene éxito, envía la cookie de autorización JWT.
     * De lo contrario, devuelve 401
     */
    @PostMapping("/login")
    fun loginReq(@RequestBody @Valid log: LoginDTO): ResponseEntity<String> {
        return try {
            val jwtCookie = authService.loginUser(log.username, log.password)
            ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build()

        } catch (e: AuthenticationException) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null)
        }
    }

    /**
     * Registra un usuario
     *
     * @param reg Datos de usuario para registrar
     * @return Si el usuario está registrado, envía una respuesta con una cookie de autorización JWT.
     * Si el usuario ya existe, envía una respuesta de BAD_REQUEST.
     */
    @PostMapping("/register")
    fun regisReq(@RequestBody @Valid reg: RegisterDTO): ResponseEntity<String> {
        println("yeyyyy")
        val trimmedUsername = reg.username!!.trim() 
        val trimmedReg = reg.copy(username = trimmedUsername)
        authService.registerUser(trimmedReg)
        return ResponseEntity.ok().build()
    }

    /**
     * Cierra la sesión de un usuario
     *
     * @param authCookie Cookie de autorización JWT del usuario
     * @return Respuesta que actualiza la edad máxima de la cookie de autorización JWT a 0
     */
    @GetMapping("/logout")
    fun logOut(@CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String): ResponseEntity<String> {
        val expiredCookie = ResponseCookie.from(SecurityConstants.AUTH_COOKIE_NAME, "")
            .httpOnly(false)
            .maxAge(0)
            .path("/")
            .sameSite("Lax")
            .secure(false)
            .build()

        return ResponseEntity
            .ok()
            .header(HttpHeaders.SET_COOKIE, expiredCookie.toString())
            .build()
    }
}
