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
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import javax.naming.AuthenticationException
import com.ci5644.trade.config.encrypt

/**
 * Servicio que contiene la lógica y funcionalidades para autorizar a
 * usuarios en el sistema.
 */
@Service
class AuthorizationService {

    @Autowired
    private lateinit var authenticationManager: AuthenticationManager

    @Autowired
    private lateinit var userRepository: UserRepository

    @Throws(NonExistentUserException::class)
    fun retrieveUser(username: String): UserEntity {
        val user = userRepository.findByUsername(username)
        return requireNotNull(user) { "User not found for username: $username" }
    }

    /**
     * Registra un usuario
     *
     * @param reg Datos del usuario a registrar
     */
    fun registerUser(reg: RegisterDTO): UserEntity {
        if (userRepository.existsByUsername(reg.username.trim())) {
            throw UsernameTakenException()
        }

        val newUser = UserEntity(
            0,
            reg.username.trim(),
            encrypt(reg.password),
            reg.name,
            reg.email,
            reg.gender
        )

        return userRepository.save(newUser)
    }

    /**
     * Inicia sesión de un usuario en el sistema y genera la cookie de autenticación JWT
     *
     * @param username Nombre de usuario del usuario
     * @param password Contraseña del usuario
     * @return Cookie de autenticación JWT
     * @throws AuthenticationException En caso de que las credenciales no sean válidas
     */
    @Throws(AuthenticationException::class)
    fun loginUser(username: String, password: String): HttpCookie {
        val appUser = retrieveUser(username.trim())
        val auth = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(appUser.username, password)
        )
        SecurityContextHolder.getContext().authentication = auth

        return JWTSecurityUtils.createJWTUserAuthCookie(
            SecurityConstants.AUTH_COOKIE_NAME,
            JWTSecurityUtils.generateJWTUserAuthToken(auth)
        )
    }
}
