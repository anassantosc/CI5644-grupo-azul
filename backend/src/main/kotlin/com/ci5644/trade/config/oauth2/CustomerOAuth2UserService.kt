package com.ci5644.trade.config.oauth2

import com.ci5644.trade.config.oauth2.CustomerOAuth2User
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.OAuth2AuthenticationException
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service

@Service
class CustomerOAuth2UserService : DefaultOAuth2UserService() {

    override fun loadUser(userRequest: OAuth2UserRequest): OAuth2User {
        return CustomerOAuth2User(super.loadUser(userRequest))
    }
}
