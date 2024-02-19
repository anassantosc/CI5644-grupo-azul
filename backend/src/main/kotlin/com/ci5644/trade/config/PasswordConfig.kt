package com.ci5644.trade.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder


/**
 * Configuration class for password encoding and decoding.
 */
@Configuration
class PasswordConfig {

    /**
     * Provides a custom PasswordEncoder bean.
     * This bean encrypts the raw password using AES algorithm before storing.
     * It also provides a method to compare raw and encoded passwords.
     * @return PasswordEncoder - Custom PasswordEncoder bean.
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return object : PasswordEncoder {
            override fun encode(rawPassword: CharSequence?): String {
                return encrypt(rawPassword?.toString() ?: "")
            }

            override fun matches(rawPassword: CharSequence?, encodedPassword: String?): Boolean {
                return comparePasswords(rawPassword?.toString() ?: "", encodedPassword ?: "")
            }
        }
    }

    /**
     * Compares the raw password with the decrypted encoded password.
     * @param rawPassword String - The raw password entered by the user.
     * @param encodedPassword String - The encoded password stored in the database.
     * @return Boolean - True if raw and decoded passwords match, false otherwise.
     */
    private fun comparePasswords(rawPassword: String, encodedPassword: String): Boolean {
        val decryptedPassword = decrypt(encodedPassword)
        return rawPassword == decryptedPassword
    }
}
