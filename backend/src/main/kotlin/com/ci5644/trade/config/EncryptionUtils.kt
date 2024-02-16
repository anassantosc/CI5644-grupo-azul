package com.ci5644.trade.config

import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import java.security.Key
import java.util.Base64
import java.util.Arrays
import com.ci5644.trade.config.SecurityConstants

/**
 * Utility class for encryption and decryption using AES algorithm.
 */
private val key: Key by lazy {
    generateKeyFromString(SecurityConstants.USER_PSSWD_SECRET, 16)
}

/**
 * Generates a key from a given string.
 * @param keyString String - The input string to generate the key from.
 * @param lengthInBytes Int - The length of the key in bytes.
 * @return Key - The generated key.
 */
private fun generateKeyFromString(keyString: String, lengthInBytes: Int): Key {
    val keyData = Arrays.copyOf(keyString.toByteArray(Charsets.UTF_8), lengthInBytes)
    return SecretKeySpec(keyData, "AES")
}

/**
 * Encrypts the given text using AES encryption algorithm.
 * @param text String - The text to be encrypted.
 * @return String - The encrypted text.
 */
fun encrypt(text: String): String {
    val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
    cipher.init(Cipher.ENCRYPT_MODE, key)
    val encryptedBytes = cipher.doFinal(text.toByteArray(Charsets.UTF_8))
    return Base64.getEncoder().encodeToString(encryptedBytes)
}

/**
 * Decrypts the given text using AES decryption algorithm.
 * @param text String - The text to be decrypted.
 * @return String - The decrypted text.
 */
fun decrypt(text: String): String {
    val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
    cipher.init(Cipher.DECRYPT_MODE, key)
    val decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(text))
    return String(decryptedBytes)
}