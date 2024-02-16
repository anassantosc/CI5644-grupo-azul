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

object JWTSecurityUtils {

    /**
     * Validates the authenticity of the provided JWT token using the specified key.
     * @param token String - The JWT token to validate.
     * @param key String - The secret key used for token validation.
     * @return Boolean - True if the token is valid, false otherwise.
     */
    fun validateToken(token: String, key: String): Boolean {
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
     * Retrieves the claims from the JWT token using the specified key.
     * @param token String - The JWT token from which to extract claims.
     * @param key String - The secret key used for parsing the JWT token.
     * @return Claims - The claims extracted from the JWT token.
     * @throws JwtException if an error occurs during JWT token parsing.
     * @throws IllegalArgumentException if an invalid argument is provided.
     */
    @Throws(JwtException::class, IllegalArgumentException::class)
    private fun getJWTClaim(token: String, key: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body
    }

    /**
     * Generates a JWT authentication token for the provided authentication object.
     * @param auth Authentication - The authentication object containing user details.
     * @return String - The generated JWT authentication token.
     */
    fun generateJWTUserAuthToken(auth: Authentication): String {
        return Jwts.builder()
            .setSubject(auth.name)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + SecurityConstants.AUTH_JWT_TOKEN_EXPIRE_TIME))
            .signWith(SignatureAlgorithm.HS256, SecurityConstants.JWT_AUTH_SECRET)
            .compact()
    }

    /**
     * Retrieves the authenticated user from the provided JWT token.
     * @param token String - The JWT token from which to extract the authenticated user.
     * @return String - The username of the authenticated user.
     * @throws JwtException if an error occurs during JWT token parsing.
     */
    @Throws(JwtException::class)
    fun getAuthUserFromJWT(token: String): String {
        return getJWTClaim(token, SecurityConstants.JWT_AUTH_SECRET).subject
    }

    /**
     * Creates an HTTP cookie containing the JWT token.
     * @param name String - The name of the cookie.
     * @param token String - The JWT token to be stored in the cookie.
     * @return HttpCookie - The HTTP cookie containing the JWT token.
     */
    fun createJWTUserAuthCookie(name: String, token: String): HttpCookie {
        return ResponseCookie.from(name, token)
            .httpOnly(false)
            .maxAge(SecurityConstants.AUTH_COOKIE_EXPIRE_TIME)
            .path("/")
            .sameSite("Lax")
            .secure(false)
            .build()
    }
}
