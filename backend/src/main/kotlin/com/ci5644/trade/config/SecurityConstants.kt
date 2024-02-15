package com.ci5644.trade.config

/**
 * Constantes utilizadas en Spring Security
 */
object SecurityConstants {
    /** Nombres de las cookies de seguridad **/
    const val AUTH_COOKIE_NAME = "JWT"

    /** Tiempo máximo de vida de la cookie JWT */
    const val AUTH_COOKIE_EXPIRE_TIME: Long = 86400L // 1 día
    const val AUTH_JWT_TOKEN_EXPIRE_TIME: Int = 86400000

    /** Palabras y signos secretos de los tokens */
    const val JWT_AUTH_SECRET = "ONOMATOPEYAMASLARGAYSEGURAONOMATOPEYAMASLARGAYSEGURAONOMATOPEYAMASLARGAYSEGURA"
    const val USER_PSSWD_SECRET = "MySecretKey12345"
}
