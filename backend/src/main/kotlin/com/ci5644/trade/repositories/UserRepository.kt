package com.ci5644.trade.repositories

import com.ci5644.trade.models.user.UserEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: CrudRepository<UserEntity, Long>