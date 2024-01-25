package com.ci5644.trade.models.user

import jakarta.persistence.*
import org.hibernate.annotations.GenericGenerator

@Entity
class UserEntity (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        var username: String,
        var password: String,
)