package com.ci5644.trade.config

object SecurityConstants {
    const val AUTH_COOKIE_NAME = "JWT"

    const val AUTH_COOKIE_EXPIRE_TIME: Long = 86400L // 1 day
    const val AUTH_JWT_TOKEN_EXPIRE_TIME: Int = 86400000

    const val JWT_AUTH_SECRET = "ONOMATOPEYA"
    const val USER_PSSWD_SECRET = "TELEFERICO"
}
