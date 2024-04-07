package com.ci5644.trade.services.auth

import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import com.ci5644.trade.dto.auth.RegisterDTO
import org.springframework.security.core.userdetails.UsernameNotFoundException
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
import org.springframework.security.crypto.password.PasswordEncoder
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import jakarta.servlet.http.Cookie
import org.slf4j.LoggerFactory

/**
 * Service class for handling authorization-related operations.
 */
@Service
class AuthorizationService {

    private val logger = LoggerFactory.getLogger(AuthorizationService::class.java)

    @Autowired
    private lateinit var authenticationManager: AuthenticationManager

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var encoder: PasswordEncoder
      
    /**
     * Retrieves user entity by username.
     * @param username String - The username of the user.
     * @return UserEntity - The user entity.
     * @throws UsernameNotFoundException if the user with the specified username does not exist.
     */
    @Throws(UsernameNotFoundException::class)
    fun retrieveUser(username: String): UserEntity {
        val user = userRepository.findByUsername(username)
        if (user == null) {
            throw UsernameNotFoundException("Not found: $username")
        }
        return user
    }

    /**
     * Registers a new user.
     * @param reg RegisterDTO - The registration details of the new user.
     * @return UserEntity - The newly registered user entity.
     * @throws UsernameTakenException if the specified username is already taken.
     */
    @Throws(UsernameTakenException::class, IllegalArgumentException::class)
    fun registerUser(reg: RegisterDTO) {
        val validationError = reg.validate()
        if (userRepository.existsByUsername(reg.username.trim())) {
            throw UsernameTakenException()
        }
        if (validationError != null) {
            throw IllegalArgumentException(validationError)
        }

        val newUser = UserEntity(
            username=reg.username.trim(),
            password=encoder.encode(reg.password),
            name=reg.name,
            email=reg.email,
            gender=reg.gender
        )
        userRepository.save(newUser)
    }

    /**
     * Logs in a user.
     * @param username String - The username of the user.
     * @param password String - The password of the user.
     * @return HttpCookie - The JWT authentication cookie.
     * @throws UsernameNotFoundException if authentication fails.
     */
    @Throws(UsernameNotFoundException::class, AuthenticationException::class)
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
        } catch (e: UsernameNotFoundException) {
            throw UsernameNotFoundException("User not found: $username")
        } catch (e: AuthenticationException) {
            throw AuthenticationException(e.message)
        }
    }

    fun processOAuthPostLogin(name: String, email: String, password: String, servletResponse: HttpServletResponse) {
        val user = userRepository.findByUsername(email)
        if (user == null) {
            val registerDTO = RegisterDTO(
                username = email,
                password = password,
                name = name,
                email = email,
                gender = null
            )
            registerUser(registerDTO)
        }
        try {
            val jwtCookie = loginUser(email, password)

            val cookieString = "${jwtCookie.name}=${jwtCookie.value}"
            val expireTimeSeconds = SecurityConstants.AUTH_COOKIE_EXPIRE_TIME
            servletResponse.addHeader("Set-Cookie", "$cookieString; Path=/; Max-Age=$expireTimeSeconds")
        } catch (e: AuthenticationException) {
            logger.error("Password Incorrect", e)
            servletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Password Incorrect")
        } catch (e: Exception) {
            logger.error("Error", e)
            servletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error")
        }
    }
}
