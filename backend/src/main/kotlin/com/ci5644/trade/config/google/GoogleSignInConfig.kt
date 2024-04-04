// package com.ci5644.trade.config.google

// import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow
// import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
// import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
// import com.google.api.client.http.HttpTransport
// import com.google.api.client.http.javanet.NetHttpTransport
// import com.google.api.client.json.jackson2.JacksonFactory
// import org.springframework.beans.factory.annotation.Value
// import org.springframework.context.annotation.Bean
// import org.springframework.context.annotation.Configuration

// @Configuration
// class GoogleSignInConfiguration(
//     @Value("\${clientId}") private val clientId: String,
//     @Value("\${clientSecret}") private val clientSecret: String
// ) {
//     @Bean
//     fun tokenVerifier(): GoogleIdTokenVerifier {
//         val transport: HttpTransport = NetHttpTransport()
//         val jsonFactory: JacksonFactory = JacksonFactory()
//         return GoogleIdTokenVerifier.Builder(transport, jsonFactory)
//             .setAudience(listOf(clientId))
//             .build()
//     }

//     @Bean
//     fun authorizationCodeFlow(): GoogleAuthorizationCodeFlow {
//         val transport: HttpTransport = NetHttpTransport()
//         val jsonFactory: JacksonFactory = JacksonFactory()
//         return GoogleAuthorizationCodeFlow.Builder(
//             transport, jsonFactory, clientId, clientSecret,
//             listOf("profile", "email")
//         ).build()
//     }
// }
