package com.ci5644.trade.config.JWT

import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.models.user.UserEntity
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.http.HttpCookie
import org.springframework.http.ResponseCookie
import org.springframework.security.core.Authentication
import java.util.*

/**
 * Clase que contiene múltiples utilidades de JWT
 */
object JWTSecurityUtils {

    /**
     * Intenta validar un token JWT
     *
     * @param token Token a validar
     * @param key   Clave de firma
     * @return True si el token es válido/False en caso contrario
     */
    fun validateToken(token: String, key: String): Boolean {
        println("5")
        return try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            true
        } catch (e: JwtException) {
            false
        } catch (e: Exception) {
            throw e
        }
    }

    /**
     * Valida y obtiene los claims de un token JWT
     *
     * @param token Token del que obtener los claims
     * @param key   Clave de firma
     * @return Claims del token JWT
     * @throws JwtException             Lanzado si el token es inválido o ha expirado
     * @throws IllegalArgumentException Lanzado si el token está vacío
     */
    @Throws(JwtException::class, IllegalArgumentException::class)
    private fun getJWTClaim(token: String, key: String): Claims {
        println("6")
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body
    }

    /**
     * Genera un token JWT utilizando un objeto de autenticación
     *
     * @param auth Objeto de autenticación
     * @return Token JWT con roles de usuario y sujeto
     */
    fun generateJWTUserAuthToken(auth: Authentication): String {
        println("7")
        return Jwts.builder()
            .setSubject(auth.name)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + SecurityConstants.AUTH_JWT_TOKEN_EXPIRE_TIME))
            .signWith(SignatureAlgorithm.HS256, SecurityConstants.JWT_AUTH_SECRET)
            .compact()
    }

    /**
     * Extrae el sujeto del token JWT
     *
     * @param token Token JWT del que extraer el sujeto
     * @return Sujeto del token JWT
     */
    @Throws(JwtException::class)
    fun getAuthUserFromJWT(token: String): String {
        println("8")
        return getJWTClaim(token, SecurityConstants.JWT_AUTH_SECRET).subject
    }

    /**
     * Crea una cookie con el token JWT para autenticar usuarios
     *
     * @param name  Nombre de la cookie
     * @param token Token a almacenar
     * @return Cookie resultante
     */
    fun createJWTUserAuthCookie(name: String, token: String): HttpCookie {
        println("9")
        return ResponseCookie.from(name, token)
            .httpOnly(false)
            .maxAge(SecurityConstants.AUTH_COOKIE_EXPIRE_TIME)
            .path("/")
            .sameSite("Lax")
            .secure(false)
            .build()
    }
}
