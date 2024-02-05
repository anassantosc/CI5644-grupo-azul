package com.ci5644.trade.models.card

import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.models.card.CardEntity
import jakarta.persistence.*
import jakarta.validation.constraints.NotEmpty
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
    val id: Long = 0,                           // Ownership id

    @Column(name = "user", nullable = false)
    @NotNull
    var user: Long,                           // User id

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

    /**
     * Set the ownership to another user
     * 
     * @param newUser the id of the user to be set
     */
    fun setUsr(newUser: Long) {
        user = newUser
    }

    /**
     * Set the quantity of this card owned
     * 
     * @param newQuantity the quantity to be set
     */
    fun setQuantty(newQuantity: Int) {
        quantity = newQuantity
    }

    /**
     * Set the visibility of the card owned
     * 
     * @param newVisibility the visibility to be set
     */
    fun setVisiblity(newVisibility: Boolean) {
        visibility = newVisibility
    }

    // #region GETTERS
    fun getVisiblity(): Boolean {
        return visibility
    }

    fun getQuantty(): Int {
        return quantity
    }

    fun getUsr(): Long {
        return user
    }

    fun getCrd(): Int {
        return card
    }
}