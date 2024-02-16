package com.ci5644.trade.controllers.api

import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.services.user.UserService
import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.services.AuthorizationService
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import com.ci5644.trade.config.decrypt

/**
 * Controller class to handle user-related HTTP requests.
 * Uses JWT authentication for requests and CORS configuration.
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = ["http://localhost:3000"], allowCredentials = "true")
class UserController(private val authorizationService: AuthorizationService) {

    @Autowired
    private lateinit var userService: UserService

    /**
     * Retrieves user details based on the provided authentication token.
     * @param authCookie String - The authentication token obtained from the cookie.
     * @return ResponseEntity<UserDto> - ResponseEntity containing user details or an error response.
     */
    @GetMapping("/detail")
    fun getUser(@CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie);
            val user = authorizationService.retrieveUser(username)
            val userDto = UserDto.fromEntity(user)
            userDto.password = decrypt(userDto.password)
            ResponseEntity.ok(userDto)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }

    /**
     * Edits user details based on the provided authentication token and new details.
     * @param authCookie String - The authentication token obtained from the cookie.
     * @param details UserDto - The new user details to be edited.
     * @return ResponseEntity<String> - ResponseEntity indicating success or failure of the edit operation.
     */
    @PostMapping("/edit")
    fun editUser(
            @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
            @RequestBody details: UserDto
        ): ResponseEntity<*> {
        val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie);
        if (username != details.username) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
        userService.editUser(details)
        return ResponseEntity.ok("User uccessfully edited")
    }
}