package com.ci5644.trade.config

import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import java.security.Key
import java.util.Base64
import java.util.Arrays
import com.ci5644.trade.config.SecurityConstants

private val key: Key by lazy {
    generateKeyFromString(SecurityConstants.USER_PSSWD_SECRET, 16)
}

private fun generateKeyFromString(keyString: String, lengthInBytes: Int): Key {
    val keyData = Arrays.copyOf(keyString.toByteArray(Charsets.UTF_8), lengthInBytes)
    return SecretKeySpec(keyData, "AES")
}

fun encrypt(text: String): String {
    val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
    cipher.init(Cipher.ENCRYPT_MODE, key)
    val encryptedBytes = cipher.doFinal(text.toByteArray(Charsets.UTF_8))
    return Base64.getEncoder().encodeToString(encryptedBytes)
}

fun decrypt(text: String): String {
    println(text)
    println("3")
    val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
    cipher.init(Cipher.DECRYPT_MODE, key)
    val decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(text))
    return String(decryptedBytes)
}