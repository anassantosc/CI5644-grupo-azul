package com.ci5644.trade.config

import com.ci5644.trade.config.JWT.EntryPointJWT
import com.ci5644.trade.config.JWT.JWTFilter
import com.ci5644.trade.config.PasswordConfig
import com.ci5644.trade.services.user.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.util.*
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import java.lang.Exception
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.boot.web.servlet.FilterRegistrationBean


@Configuration
class SecurityConfig {

    @Autowired
    lateinit var userDetailsService: UserService

    @Autowired
    private val unauthorizedHandler: EntryPointJWT? = null

    @Bean
    fun securityPasswordEncoder(): PasswordEncoder {
        return PasswordConfig().passwordEncoder()
    }

    @Bean
    fun authenticationJwtTokenFilter(): JWTFilter? {
        return JWTFilter()
    }

    fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userDetailsService).passwordEncoder(securityPasswordEncoder())
    }

    @Bean
    fun authProvider(): DaoAuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setPasswordEncoder(securityPasswordEncoder())
        authProvider.setUserDetailsService(userDetailsService)
        return authProvider
    }

    @Bean
    @Throws(Exception::class)
    fun authenticationManagerBean(http: HttpSecurity) : AuthenticationManager {
        return http.getSharedObject(AuthenticationManagerBuilder::class.java)
                .authenticationProvider(authProvider())
                .build()
    }

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
    
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("*") // Permitir todos los orígenes
        configuration.allowedMethods = listOf("*") // Permitir todos los métodos HTTP
        configuration.allowedHeaders = listOf("*") // Permitir todos los encabezados
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

}
