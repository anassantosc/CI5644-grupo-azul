package com.ci5644.trade.controllers.api

import com.ci5644.trade.services.card.OfferService
import com.ci5644.trade.dto.OfferDto
import com.ci5644.trade.models.card.OfferStatus
import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import com.ci5644.trade.services.auth.AuthorizationService
import org.springframework.security.core.AuthenticationException
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page



/**
 * Controller that contains all the endpoints related to offer management.
 */

@RestController
@RequestMapping("/api/offer")
@CrossOrigin(origins = ["http://localhost:3000"], allowCredentials = "true")
class OfferController(private val authorizationService: AuthorizationService) {

    @Autowired
    private lateinit var offerService: OfferService

    /**
     * Creates a new offer.
     *
     * @param requestBody A map containing the request body with the keys 'cardOffer' for the card to offer and 'cardReceive' for the card to receive.
     * @return A response entity containing a json with the created offer.
     */
    @PostMapping("/create")
    fun createOffer(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @RequestBody requestBody: Map<String, Int>
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
            val user = authorizationService.retrieveUser(username)
            val cardOffer = requestBody["cardOffer"]
            val cardReceive = requestBody["cardReceive"]
    
            if (cardOffer == null || cardReceive == null || cardOffer == cardReceive) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("cardOffer and cardReceive must be provided")
            }

    
            val offer = offerService.createOffer(user.id, cardOffer, cardReceive)
            if (offer.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No offers were created")
            }
            ResponseEntity.ok("Offer created")

        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
        }
    }
    

    /* 
    * Gets a list of offers with pending 
    *
    *@param authCookie The JWT cookie
    * @return A list of offers with PENDING status
    */
    @GetMapping("/get-offers/{pageable}")
    fun getOffers(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @PathVariable pageable: Pageable
    ): ResponseEntity<Page<OfferDto>> {
        val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
        val user = authorizationService.retrieveUser(username)
        val offers = offerService.getPendingOffers(pageable).map { OfferDto.fromEntity(it) }
        return ResponseEntity.ok(offers)
    }
    

    /**
     * Denies an offer.
     * 
     * @param authCookie The JWT cookie
     * @param requestBody A map containing the request body with the key 'offerId' for the offer ID.
     * @return A response entity containing a json with the deny offer.
     */
    @PostMapping("/deny")
    fun denyOffer(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @RequestBody requestBody: Map<String, Int>
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie);
            val user = authorizationService.retrieveUser(username)
            val offerId = requestBody["offerId"]

            if (offerId == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offer ID must be provided")
            }
    
            val offer = offerService.findOfferById(offerId)

            if (offer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Offer not found")
            }
            
            
            offerService.updateOfferByStatus(offerId, OfferStatus.CANCELLED)
            ResponseEntity.ok(offer)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
        }
    }


    /**
     * Accepts an offer.
     * 
     * @param authCookie The JWT cookie
     * @param requestBody A map containing the request body with the key 'offerId' for the offer ID.
     * @return A response entity containing a json with the accept offer.
     */
    @PostMapping("/accept")
    fun acceptOffer(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @RequestBody requestBody: Map<String, Int>
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie);
            val user = authorizationService.retrieveUser(username)
            val offerId = requestBody["offerId"]

            if (offerId == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offer ID must be provided")
            }
    
            val offer = offerService.findOfferById(offerId)

            if (offer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Offer not found")
            }


            val updatedOffer = offerService.updateOfferByStatus(offerId, OfferStatus.ACCEPTED)
            ResponseEntity.ok(updatedOffer)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
        }
    }
}