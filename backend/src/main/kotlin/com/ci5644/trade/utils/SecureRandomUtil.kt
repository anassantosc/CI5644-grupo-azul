package com.ci5644.trade.utils

import java.security.SecureRandom

object SecureRandomUtil {
    private val secureRandom = SecureRandom()

    /**
     * Generate a random integer within the specified range.
     *
     * @param min The minimum value of the range (inclusive)
     * @param max The maximum value of the range (inclusive)
     * @return A random integer within the specified range
     */
    fun getRandomInt(min: Int, max: Int): Int {
        return secureRandom.nextInt(max - min + 1) + min
    }
}