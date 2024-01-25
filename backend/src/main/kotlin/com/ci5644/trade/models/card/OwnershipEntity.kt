package com.ci5644.trade.models.card

import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.models.card.CardEntity
import jakarta.persistence.*
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import lombok.Getter
import lombok.Setter

/**
 * Entity representing the ownership of a card by a user
 */
@Entity
@Table(
    uniqueConstraints = [UniqueConstraint(columnNames = ["user_id", "card_id"])]
)
@Getter
@Setter
class OwnershipEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(name = "user_id", nullable = false)
    @NotNull
    var userId: Long,

    @Column(name = "card_id", nullable = false)
    @NotNull
    val cardId: Int,

    @NotNull
    @Column(nullable = false)
    var quantity: Int = 1,

    @NotNull
    @Column(nullable = false)
    var visibility: Boolean = true

) {

    fun increaseQuantity() {
        quantity += 1
    }

    fun decreaseQuantity() {
        if (quantity > 0) {
            quantity -= 1
            return
        }
        throw IllegalStateException("Quantity cannot be decreased below 0.")
    }

    fun setUser(newUserId: Long) {
        userId = newUserId
    }

    /*
    fun setQuantity(newQuantity: Long) {
        userId = newQuantity
    }

    fun setVisibility(newVisibility: Boolean) {
        visibility = newVisibility
    }

    fun getVisibility(): Boolean {
        return visibility
    }

    fun getQuantity(): Int {
        return quantity
    }
     */

    fun getUser(): Long {
        return userId
    }

    fun getCar(): Int {
        return cardId
    }
}