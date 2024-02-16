package com.ci5644.trade.services

import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import com.ci5644.trade.dto.auth.RegisterDTO
import com.ci5644.trade.exceptions.runtime.NonExistentUserException
import com.ci5644.trade.exceptions.runtime.UsernameTakenException
import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpCookie
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import javax.naming.AuthenticationException
import com.ci5644.trade.config.encrypt

/**
 * Service class for handling authorization-related operations.
 */
@Service
class AuthorizationService {

    @Autowired
    private lateinit var authenticationManager: AuthenticationManager

    @Autowired
    private lateinit var userRepository: UserRepository

    /**
     * Retrieves user entity by username.
     * @param username String - The username of the user.
     * @return UserEntity - The user entity.
     * @throws NonExistentUserException if the user with the specified username does not exist.
     */
    @Throws(NonExistentUserException::class)
    fun retrieveUser(username: String): UserEntity {
        if (!userRepository.existsByUsername(username)) {
            throw NonExistentUserException()
        }
        return userRepository.findByUsername(username)
    }

    /**
     * Registers a new user.
     * @param reg RegisterDTO - The registration details of the new user.
     * @return UserEntity - The newly registered user entity.
     * @throws UsernameTakenException if the specified username is already taken.
     */
    @Throws(UsernameTakenException::class, IllegalArgumentException::class)
    fun registerUser(reg: RegisterDTO): UserEntity {
        if (userRepository.existsByUsername(reg.username.trim())) {
            throw UsernameTakenException()
        }
        if (reg.username.length <= 5) {
            throw IllegalArgumentException("Username must be longer than 5 characters")
        }
        if (reg.password.length <= 8) {
            throw IllegalArgumentException("Password must be longer than 8 characters")
        }

        val newUser = UserEntity(
            username=reg.username.trim(),
            password=encrypt(reg.password),
            name=reg.name,
            email=reg.email,
            gender=reg.gender
        )

        return userRepository.save(newUser)
    }

    /**
     * Logs in a user.
     * @param username String - The username of the user.
     * @param password String - The password of the user.
     * @return HttpCookie - The JWT authentication cookie.
     * @throws AuthenticationException if authentication fails.
     */
    @Throws(NonExistentUserException::class, AuthenticationException::class)
    fun loginUser(username: String, password: String): HttpCookie {
        try {
            val appUser = retrieveUser(username.trim())
            val auth = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(appUser.username, password)
            )
            SecurityContextHolder.getContext().authentication = auth

            return JWTSecurityUtils.createJWTUserAuthCookie(
                SecurityConstants.AUTH_COOKIE_NAME,
                JWTSecurityUtils.generateJWTUserAuthToken(auth)
            )
        } catch (e: NonExistentUserException) {
            throw NonExistentUserException("User not found: $username")
        } catch (e: AuthenticationException) {
            throw AuthenticationException(e.message)
        }
    }
}