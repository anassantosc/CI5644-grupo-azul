package com.ci5644.trade.config.oauth2

import com.ci5644.trade.services.auth.AuthorizationService
import com.ci5644.trade.config.oauth2.CustomerOAuth2User
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler
import org.springframework.stereotype.Component
import org.springframework.security.core.Authentication
import org.springframework.beans.factory.annotation.Autowired
import java.io.IOException
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory

@Component
class OAuth2LoginSuccessHandler : SavedRequestAwareAuthenticationSuccessHandler() {

    private val logger = LoggerFactory.getLogger(OAuth2LoginSuccessHandler::class.java)

    @Autowired
    private lateinit var authService: AuthorizationService

    @Throws(IOException::class, ServletException::class)
    fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ) {
        logger.info("Authentication accepted")
        val oauthUser = authentication.principal as CustomerOAuth2User

        authService.processOAuthPostLogin(oauthUser.getEmail(), "password", response)

        response.sendRedirect("/album")
    }
}
