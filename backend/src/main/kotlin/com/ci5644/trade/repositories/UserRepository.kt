package com.ci5644.trade.repositories

import com.ci5644.trade.models.user.UserEntity
import org.springframework.stereotype.Repository
import org.springframework.data.repository.CrudRepository

@Repository
interface UserRepository: CrudRepository<UserEntity, Long> {
    fun existsByUsername(username: String): Boolean

    fun findByUsername(username: String): UserEntity
}