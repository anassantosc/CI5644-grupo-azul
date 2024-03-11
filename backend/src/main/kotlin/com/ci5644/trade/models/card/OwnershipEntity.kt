package com.ci5644.trade.models.card

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull

/**
 * Entity representing the ownership of a card by a user
 */
@Entity
@Table(
    name = "PERTENENCIA",
    uniqueConstraints = [UniqueConstraint(columnNames = ["user", "card"])]
)
class OwnershipEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,                           // Ownership id

    @Column(name = "user", nullable = false)
    @NotNull
    var user: Int,                           // User id

    @Column(name = "card", nullable = false)
    @NotNull
    val card: Int,                            // Card id

    @NotNull
    var quantity: Int = 1,                      // Quantity of cards own

    @NotNull
    var visibility: Boolean = true              // User preferrence visibility
) {

    /**
     * Increase the quantity of this card own by the user
     */
    fun increaseQuantity() {
        quantity += 1
    }

    /**
     * Decrease the quantity of this card own by the user
     * Minimun quantity required: 1
     */
    fun decreaseQuantity() {
        if (quantity > 0) {
            quantity -= 1
            return
        }
        throw IllegalStateException("Quantity cannot be decreased below 0.")
    }
}