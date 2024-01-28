package com.ci5644.trade.entities

import jakarta.persistence.*

@Entity
class CardEntity (
    @Id
    val id: Int,
    val name: String,
    val number: Int,
    val country: String,
    val position: String,
    val height: Float,
    val weight: Float,
)