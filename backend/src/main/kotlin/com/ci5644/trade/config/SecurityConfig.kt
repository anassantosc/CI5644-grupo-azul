package com.ci5644.trade.config

import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.EntryPointJWT
import com.ci5644.trade.config.JWT.JWTFilter
import com.ci5644.trade.services.user.UserService
import com.ci5644.trade.config.oauth2.CustomerOAuth2User
import com.ci5644.trade.config.oauth2.CustomerOAuth2UserService
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
import org.springframework.security.oauth2.*
import org.slf4j.LoggerFactory
import com.ci5644.trade.services.auth.AuthorizationService
import org.springframework.security.core.Authentication
import java.io.IOException
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler


/**
 * Configuration class for security settings.
 */
@Configuration
class SecurityConfig(private val userDetailsService: UserService) {

    private val logger = LoggerFactory.getLogger(SecurityConfig::class.java)

    @Autowired
    private lateinit var authService: AuthorizationService

    @Autowired
    private val unauthorizedHandler: EntryPointJWT? = null

    @Autowired
    lateinit private var oAuth2UserService: CustomerOAuth2UserService 

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
            .csrf().disable()
            .cors()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(unauthorizedHandler)
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/auth/**").permitAll()
            .requestMatchers("/api/**").authenticated()
            .anyRequest().authenticated()
            .and()
            .formLogin().permitAll()
            .and()
            .oauth2Login()
                .loginPage("/login")
                .userInfoEndpoint()
                    .userService(oAuth2UserService)
            .and()
            .successHandler { request, response, authentication ->
                val oauthUser = authentication.principal as CustomerOAuth2User
                authService.processOAuthPostLogin(oauthUser.getFullName(), oauthUser.getEmail(), SecurityConstants.USER_PSSWD_SECRET, response)
                response.sendRedirect(SecurityConstants.FRONTEND_URL + "/album")
            }
            .failureHandler(SimpleUrlAuthenticationFailureHandler())
            .and()
            .logout()

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
        configuration.allowedOrigins = listOf(SecurityConstants.BACKEND_URL, SecurityConstants.FRONTEND_URL)
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE")
        configuration.allowedHeaders = listOf("*") // Accept all headers
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
}
