package com.ci5644.trade.controllers.auth

import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.dto.auth.LoginDTO
import com.ci5644.trade.dto.auth.RegisterDTO
import com.ci5644.trade.services.auth.AuthorizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import javax.naming.AuthenticationException
import org.springframework.web.bind.annotation.*
import com.ci5644.trade.exceptions.runtime.UsernameTakenException
import org.springframework.security.core.userdetails.UsernameNotFoundException

/**
 * Controller handling authentication-related endpoints.
 */
@RestController
@RequestMapping("/auth")
class AuthenticationController(private val authService: AuthorizationService) {


    /**
     * Handles login requests.
     * @param log LoginDTO - The login credentials.
     * @return ResponseEntity<Any> - Response entity indicating success or failure of the login attempt.
     */
    @PostMapping("/login")
    fun loginReq(@RequestBody log: LoginDTO): ResponseEntity<Any> {
        return try {
            val jwtCookie = authService.loginUser(log.username, log.password)
            ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).build()
        } catch (e: UsernameNotFoundException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        } catch (e: AuthenticationException) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: ${e.message}")
        }
    }

    /**
     * Handles registration requests.
     * @param reg RegisterDTO - The user registration details.
     * @return ResponseEntity<Any> - Response entity indicating success or failure of the registration attempt.
     */
    @PostMapping("/register")
    fun regisReq(@RequestBody reg: RegisterDTO): ResponseEntity<Any> {
        val trimmedUsername = reg.username.trim() 
        val trimmedReg = reg.copy(username = trimmedUsername)
        return try {
            authService.registerUser(trimmedReg)
            ResponseEntity.ok().build()
        } catch (e: UsernameTakenException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already taken")
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error")
        }
    }

    /**
     * Handles logout requests.
     * @param authCookie String - The JWT authentication cookie.
     * @return ResponseEntity<String> - Response entity indicating success or failure of the logout attempt.
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
