package com.ci5644.trade.models.user

import jakarta.persistence.*

@Entity
@Table(name = "USUARIO")
class UserEntity (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int = 0,
        var username: String,
        var password: String,
        var name: String,
        var email: String,
        var gender: String?,
)
