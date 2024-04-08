package com.ci5644.trade.controllers.api

import com.ci5644.trade.services.card.OfferService
import com.ci5644.trade.dto.OfferDto
import com.ci5644.trade.models.card.OfferStatus
import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import com.ci5644.trade.exceptions.runtime.OfferNotFoundException
import com.ci5644.trade.services.card.PurchaseService
import com.ci5644.trade.dto.CardDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.security.core.AuthenticationException
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page

/**
 * Controller that contains all the endpoints related to purchase management.
 */

@RestController
@RequestMapping("/api/purchase")
class PurchaseController(private val purchaseService: PurchaseService) {
    /**
     * Retrieves the list of cards purchased by the user.
     *
     * @param authCookie The JWT token of the user.
     * @param quantity The quantity of cards to purchase.
     * 
     * @return The list of cards purchased.
     */
    @GetMapping()
    fun getPurchasedCards (
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @RequestParam quantity: Int
    ): ResponseEntity<*> {
        return try {
            if (quantity < 1 || quantity > 100) {
                throw IllegalArgumentException("La numero de paquetes a comprar debe ser entre 1 y 100")
            }
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
            val purchase = purchaseService.createPurchase(username, quantity)
            val cards = purchaseService.processPurchase(purchase.id)
            ResponseEntity.ok(cards)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        }
    }
}