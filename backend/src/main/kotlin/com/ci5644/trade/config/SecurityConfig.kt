package com.ci5644.trade.config

import com.ci5644.trade.config.JWT.EntryPointJWT
import com.ci5644.trade.config.JWT.JWTFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource
import java.util.*

@Configuration
@EnableWebSecurity(debug = true)
class SecurityConfig(private val usersDetailsService: JPAUsersDetailsService,
                     private val authEntryPointJWT: EntryPointJWT,
                     private val jwtFilter: JWTFilter) {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
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
                .authenticationEntryPoint(authEntryPointJWT)
                .and()
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers("/api/a**").authenticated()
                    .anyRequest().authenticated()
            }
            .httpBasic()
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }

    @Bean
    fun authProvider(): DaoAuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setPasswordEncoder(passwordEncoder())
        authProvider.setUserDetailsService(usersDetailsService)
        return authProvider
    }

    @Bean
    @Throws(Exception::class)
    fun authManager(http: HttpSecurity): AuthenticationManager {
        return http.getSharedObject(AuthenticationManagerBuilder::class.java)
            .authenticationProvider(authProvider())
            .build()
    }

    /**
     * Cors configuration
     */
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val conf = CorsConfiguration()
        conf.allowedOrigins = listOf("http://localhost:8080", "http://localhost:3000")
        conf.allowedMethods = listOf("*")
        conf.allowedHeaders = listOf("*")
        conf.allowCredentials = true

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", conf)

        return source as CorsConfigurationSource
    }
}
