package com.ci5644.trade.repositories

import com.ci5644.trade.entities.UserEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: CrudRepository<UserEntity, String>