package com.ci5644.trade.config

import com.ci5644.trade.config.JWT.EntryPointJWT
import com.ci5644.trade.config.JWT.JWTFilter
import com.ci5644.trade.services.user.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.util.*
import java.lang.Exception


/**
 * Configuration class for security settings.
 */
@Configuration
class SecurityConfig {

    @Autowired
    lateinit var userDetailsService: UserService

    @Autowired
    private val unauthorizedHandler: EntryPointJWT? = null

    /**
     * Provides a custom PasswordEncoder bean.
     * @return PasswordEncoder - Custom PasswordEncoder bean.
     */
    @Bean
    fun securityPasswordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    /**
     * Provides a custom JWT token filter bean.
     * @return JWTFilter - Custom JWTFilter bean.
     */
    @Bean
    fun authenticationJwtTokenFilter(): JWTFilter {
        return JWTFilter()
    }

    /**
     * Configures authentication manager to use custom user details service and password encoder.
     */
    fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userDetailsService).passwordEncoder(securityPasswordEncoder())
    }

    /**
     * Configures the DaoAuthenticationProvider with custom user details service and password encoder.
     * @return DaoAuthenticationProvider - Configured authentication provider.
     */
    @Bean
    fun authProvider(): DaoAuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setPasswordEncoder(securityPasswordEncoder())
        authProvider.setUserDetailsService(userDetailsService)
        return authProvider
    }

    /**
     * Configures the authentication manager bean.
     * @param http HttpSecurity - HttpSecurity object for configuring HTTP security.
     * @return AuthenticationManager - Configured authentication manager.
     */
    @Bean
    @Throws(Exception::class)
    fun authenticationManagerBean(http: HttpSecurity) : AuthenticationManager {
        return http.getSharedObject(AuthenticationManagerBuilder::class.java)
                .authenticationProvider(authProvider())
                .build()
    }

    /**
     * Configures security filters and authorization rules.
     * @param http HttpSecurity - HttpSecurity object for configuring HTTP security.
     * @return SecurityFilterChain - Configured security filter chain.
     */
    @Bean
    fun filterChain(http: HttpSecurity) : SecurityFilterChain {
        http
            .headers()
            .xssProtection()
            .and()
            .contentSecurityPolicy("script-src")
            .and().and()
            .csrf().disable()
            .cors()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(unauthorizedHandler)
            .and()
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers("/api/**").authenticated()
                    .anyRequest().authenticated()
            }
            .httpBasic()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }
    
    /**
     * Provides a custom CorsConfigurationSource bean for CORS configuration.
     * @return CorsConfigurationSource - Custom CorsConfigurationSource bean.
     */
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("http://localhost:8080", "http://localhost:3000")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE")
        configuration.allowedHeaders = listOf("*") // Accept all headers
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
}
