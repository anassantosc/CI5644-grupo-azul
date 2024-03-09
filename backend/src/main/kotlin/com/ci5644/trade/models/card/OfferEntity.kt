package com.ci5644.trade.models.card

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull


enum class OfferStatus {
    PENDING,
    ACCEPTED,
    CANCELLED,
    COUNTEROFFER,
    AUTO_CANCELLED
}

/**
 * Entity representing the offer of a card by a user
*/

@Entity
@Table(
    name = "OFERTA",
)
class OfferEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,                           // Offer id

    @Column(name = "id_usuario_offer", nullable = false)
    @NotNull
    var userOffer: Int,                           // User id

    @Column(name = "id_usuario_receive", nullable = false)
    @NotNull
    var userReceive: Int,                           // User id

    @Column(name = "id_barajita_offer", nullable = false)
    @NotNull
    var cardOffer: Int,                            // Card id

    @Column(name = "id_barajita_receive", nullable = false)
    @NotNull
    var cardReceive: Int,                            // Card id

    @Column(name = "status", nullable = false)
    @NotNull
    @Enumerated(EnumType.STRING)
    var status: OfferStatus

)
