// package com.ci5644.trade.config

// import com.ci5644.trade.models.user.UserEntity
// import com.ci5644.trade.services.user.UserService
// import org.springframework.beans.factory.annotation.Autowired
// import org.springframework.security.core.userdetails.User
// import org.springframework.security.core.userdetails.UserDetails
// import org.springframework.security.core.userdetails.UserDetailsService
// import org.springframework.security.core.userdetails.UsernameNotFoundException
// import org.springframework.stereotype.Component

// /**
//  * UserDetailsService implementation using JPA
//  */
// @Component
// class JPAUsersDetailsService : UserDetailsService {

//     @Autowired
//     private lateinit var userService: UserService

//     @Throws(UsernameNotFoundException::class)
//     override fun loadUserByUsername(username: String): UserDetails {
//         val appUser: UserEntity? = userService.getUserByUsername(username)
//         if (appUser == null)
//             throw UsernameNotFoundException("Non existent user: $username")

//         return User.withUsername(username)
//             .password(appUser.password)
//             .build()
//     }
// }
