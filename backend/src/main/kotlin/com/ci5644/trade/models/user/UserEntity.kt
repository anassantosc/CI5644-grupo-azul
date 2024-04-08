package com.ci5644.trade.models.user

import jakarta.persistence.*
import java.time.LocalDate

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
        @Column(name = "card_number")
        var cardNumber: String? = null,
        @Column(name = "expiration_date")
        var expirationDate: LocalDate? = null,
        var cvv: String? = null,
)
