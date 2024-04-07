package com.ci5644.trade.config

object SecurityConstants {
    const val AUTH_COOKIE_NAME = "JWT"

    const val AUTH_COOKIE_EXPIRE_TIME: Long = 86400L // 1 day
    const val AUTH_JWT_TOKEN_EXPIRE_TIME: Int = 86400000

    const val JWT_AUTH_SECRET = "ONOMATOPEYAPARANQUTIRIMICUAROETERNONMASTOICLEIDOMAXILOFACIALESTACIONAMIENTO"
    const val USER_PSSWD_SECRET = "TELEFERICO"

    //const val URL = "http://140.82.30.53"
    const val URL = "http://localhost"
    const val BACKEND_URL = URL + ":8080"
    const val FRONTEND_URL = URL + ":3000"
}
