package com.ci5644.trade.config

import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import java.util.Base64
import com.ci5644.trade.config.SecurityConstants

fun encrypt(text: String): String {
    val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
    cipher.init(Cipher.ENCRYPT_MODE, SecretKeySpec(SecurityConstants.USER_PSSWD_SECRET.toByteArray(), "AES"))
    val encryptedBytes = cipher.doFinal(text.toByteArray(Charsets.UTF_8))
    return Base64.getEncoder().encodeToString(encryptedBytes)
}

fun decrypt(text: String): String {
    val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
    cipher.init(Cipher.DECRYPT_MODE, SecretKeySpec(SecurityConstants.USER_PSSWD_SECRET.toByteArray(), "AES"))
    val decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(text))
    return String(decryptedBytes)
}
