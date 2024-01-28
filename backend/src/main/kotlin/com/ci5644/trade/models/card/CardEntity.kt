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
    val id: Int,

    @Column(length = 64)
    @NotNull
    val playerName: String,
    
    @NotNull
    @Column(nullable = false)
    val country: String,
    
    @NotNull
    @Column(nullable = false)
    val position: String,

    @NotNull
    @Column(nullable = false)
    val height: Float,

    @NotNull
    @Column(nullable = false)
    val weight: Float,
) {
    // #regio GETTERS

    fun getId() : Int {
        return Id
    }

    fun playerName : String {
        return playerName
    }

    fun position : String {
        return position
    }

    fun height: Float {
        return height
    }

    fun weight : Float {
        return weight
    }
}