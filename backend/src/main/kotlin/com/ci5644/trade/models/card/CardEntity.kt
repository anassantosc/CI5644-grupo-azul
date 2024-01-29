package com.ci5644.trade.models.card

import jakarta.persistence.*
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull

/**
 * Entity representing a card
 */
@Entity
class CardEntity (
    @Id
    var id: Int,

    @Column(length = 64)
    @NotNull
    var playerName: String,

    @Column(nullable = false)
    @NotNull
    var number: Int,

    @NotNull
    @Column(nullable = false)
    var country: String,

    @NotNull
    @Column(nullable = false)
    var position: String,

    @NotNull
    @Column(nullable = false)
    var height: Double,

    @NotNull
    @Column(nullable = false)
    var weight: Double,
) {}