package com.ci5644.trade.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder
import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import java.util.Base64
import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.decrypt  
import com.ci5644.trade.config.encrypt

@Configuration
class PasswordConfig {

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

    private fun comparePasswords(rawPassword: String, encodedPassword: String): Boolean {
        val decryptedPassword = decrypt(encodedPassword)
        return rawPassword == decryptedPassword
    }
}
