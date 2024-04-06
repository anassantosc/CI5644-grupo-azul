package com.ci5644.trade.services.card

import com.ci5644.trade.repositories.PurchaseRepository
import com.ci5644.trade.models.card.PurchaseEntity
import com.ci5644.trade.repositories.CardRepository
import com.ci5644.trade.dto.CardDto
import com.ci5644.trade.models.card.PurchaseStatus
import com.ci5644.trade.services.auth.AuthorizationService
import com.ci5644.trade.services.card.OwnershipService
import org.springframework.stereotype.Service
import java.util.Date

@Service
class PurchaseService(
    private val authorizationService: AuthorizationService,
    private val ownershipService: OwnershipService, 
    private val purchaseRepository: PurchaseRepository, 
    private val cardRepository: CardRepository
) {
    
    fun createPurchase(username: String, quantity: Int): PurchaseEntity {
        val usr = authorizationService.retrieveUser(username)
        if (usr.cardNumber == null || usr.cvv == null || usr.expirationDate == null) {
            throw IllegalStateException("El usuario tiene que tener todos los datos de la tarjeta para poder comprar cartas")
        }
        val purchase = PurchaseEntity(
            user = usr.id,
            quantity = quantity,
            date = Date(),
            price = quantity * PurchaseEntity.PRICE,
            status = PurchaseStatus.PENDING
        )
        return purchaseRepository.save(purchase)
    }

    fun processPurchase(purchaseId: Int): List<List<CardDto>> {
        val purchase = purchaseRepository.findById(purchaseId) ?: throw IllegalArgumentException("La compra no existe")
        if (purchase.status != PurchaseStatus.PENDING) {
            throw IllegalStateException("La compra ya ha sido procesada")
        }
        
        val cards = mutableListOf<CardDto>()

        for (i in 1..purchase.quantity) {
            for (j in 1..5) {
                val ownership = ownershipService.generateRandomOwnership(purchase.user)
                val card = cardRepository.findById(ownership.card).orElseThrow { 
                    IllegalArgumentException("La carta no existe") 
                }
                cards.add(CardDto.fromEntity(card))
            }
        }

        purchase.status = PurchaseStatus.PROCESSED
        purchaseRepository.save(purchase)

        return cards.chunked(5)
    }

}