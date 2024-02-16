package com.ci5644.trade.services.user

import com.ci5644.trade.repositories.UserRepository
import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.dto.UserDto
import com.ci5644.trade.exceptions.runtime.NonExistentUserException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import com.ci5644.trade.config.encrypt

/**
 * Service class for managing user-related operations.
 */
@Service
class UserService : UserDetailsService {

    @Autowired
    lateinit var userRepository: UserRepository

    /**
     * Loads user details by username.
     * @param username String - The username of the user.
     * @return UserDetails - User details.
     * @throws UsernameNotFoundException if the user with the specified username is not found.
     */
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        if (!userRepository.existsByUsername(username))
            throw UsernameNotFoundException("Not found: $username")
        val user = userRepository.findByUsername(username)
        return User.withUsername(user.username)
            .password(user.password)
            .build()
    }

    /**
     * Edits user details.
     * @param details UserDto - The details of the user to be edited.
     * @throws NonExistentUserException if the user with the specified username does not exist.
     */
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