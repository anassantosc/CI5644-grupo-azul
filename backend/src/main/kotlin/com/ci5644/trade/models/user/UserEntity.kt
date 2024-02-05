package com.ci5644.trade.models.user

import jakarta.persistence.*
import org.hibernate.annotations.GenericGenerator

@Entity
@Table(name = "USUARIO")
class UserEntity (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        var username: String,
        var password: String,
)
//psql -U azulito - azulito-pg