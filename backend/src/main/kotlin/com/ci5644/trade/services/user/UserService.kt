package com.ci5644.trade.services.user

import com.ci5644.trade.repositories.UserRepository
import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.exceptions.runtime.NonExistentUserException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import com.ci5644.trade.config.encrypt


@Service
class UserService : UserDetailsService {

    @Autowired
    lateinit var userRepository: UserRepository

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
        if (user == null)
            throw UsernameNotFoundException("Not found: $username")
        return User.withUsername(user.username)
            .password(user.password)
            .build()
    }

    fun getUserByUsername(username: String): UserEntity {
        return userRepository.findByUsername(username) ?: throw NonExistentUserException()
    }  

    fun editUser(details: UserDto) {
        val user = userRepository.findByUsername(details.username)
                ?: throw NonExistentUserException()
        user.name = details.name
        user.email = details.email
        user.gender = details.gender
        user.password = encrypt(details.password)
        userRepository.save(user)
    }
}