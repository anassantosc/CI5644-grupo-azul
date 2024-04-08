package com.ci5644.trade.models.card

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import java.util.Date

enum class PurchaseStatus {
    PENDING,
    PROCESSED
}

@Entity
@Table(name = "COMPRA")
class PurchaseEntity (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int = 0,
        @Column(name = "id_usuario", nullable = false)
        @NotNull
        var user: Int,
        @Column(name = "dte", nullable = false)
        @NotNull
        var date: Date,
        @Column(name = "price", nullable = false)
        @NotNull
        var price: Float,
        @Column(name = "quantity", nullable = false)
        @NotNull
        var quantity: Int,
        @Column(name = "status", nullable = false)
        @NotNull
        @Enumerated(EnumType.STRING)
        var status: PurchaseStatus,
) {
        companion object {
            const val PRICE = 100.0f
        }
}