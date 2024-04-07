package com.ci5644.trade.config.oauth2

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.user.OAuth2User

class CustomerOAuth2User(private val oauth2User: OAuth2User) : OAuth2User {

    override fun getAttributes(): Map<String, Any> {
        return oauth2User.attributes
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return oauth2User.authorities
    }

    override fun getName(): String {
        return oauth2User.getAttribute<String>("name") ?: ""
    }

    fun getFullName(): String {
        return oauth2User.getAttribute<String>("name") ?: ""
    }

    fun getEmail(): String {
        return oauth2User.getAttribute<String>("email") ?: ""
    }
}
