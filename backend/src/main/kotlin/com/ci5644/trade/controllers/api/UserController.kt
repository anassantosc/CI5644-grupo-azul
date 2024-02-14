package com.ci5644.trade.controllers.api

import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.services.user.UserService
import com.ci5644.trade.dto.UserDto
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import com.ci5644.trade.config.decrypt


/**
 * Controller that contains all the endpoints related to user management.
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = ["http://localhost:3000"], allowCredentials = "true")
class UserController {

    @Autowired
    private lateinit var userService: UserService

    @GetMapping("/details")
    fun getUser(@PathVariable("username") username: String): ResponseEntity<*> {
        return try {
            val user = userService.getUserByUsername(username)
            val userDto = UserDto.fromEntity(user)
            userDto.password = decrypt(userDto.password)
            ResponseEntity.ok(userDto)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }

    @PostMapping("/edit")
    fun editUser(@RequestBody details: UserDto): ResponseEntity<String> {
        userService.editUser(details)
        return ResponseEntity.ok("User uccessfully edited")
    }

}