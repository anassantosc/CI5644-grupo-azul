package com.ci5644.trade.models.user

import jakarta.persistence.*
import org.hibernate.annotations.GenericGenerator

@Entity
class UserEntity (
        @Id
        @GeneratedValue(generator = "system-uuid")
        @GenericGenerator(name = "system-uuid", strategy = "uuid")
        val id: String,
        var username: String,
        var password: String,
)