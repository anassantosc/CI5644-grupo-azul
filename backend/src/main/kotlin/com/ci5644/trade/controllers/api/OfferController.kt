package com.ci5644.trade.controllers.api

import com.ci5644.trade.services.card.OfferService
import com.ci5644.trade.dto.OfferDto
import com.ci5644.trade.models.card.OfferStatus
import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import com.ci5644.trade.exceptions.runtime.OfferNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.security.core.AuthenticationException
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page
import java.util.NoSuchElementException



/**
 * Controller that contains all the endpoints related to offer management.
 */

@RestController
@RequestMapping("/api/offer")
class OfferController() {

    @Autowired
    private lateinit var offerService: OfferService

    /**
     * Creates a new offer.
     *
     * @param requestBody A map containing the request body with the keys 'cardOffer' for the card to offer and 'cardReceive' for the card to receive.
     * @return A response entity containing a json with the created offer.
     */
    @PostMapping()
    fun createOffer(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @RequestBody requestBody: Map<String, Int>
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
            val cardOffer = requestBody["cardOffer"]
            val cardReceive = requestBody["cardReceive"]
    
            if (cardOffer == null || cardReceive == null || cardOffer == cardReceive ) {
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("cardOffer and cardReceive must be provided")
            }
    
            offerService.createOffer(username, cardOffer!!, cardReceive!!)
            ResponseEntity.ok("Offer created")
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        } catch (e: NoSuchElementException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
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
    @GetMapping()
    fun getOffers(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @RequestParam page: Int
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie) 

            if (page < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Page number must be an integer greater or equal than 0")
            } 

            ResponseEntity.ok(offerService.getPendingOffers(username, page))
        } catch (e: OfferNotFoundException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offer not found")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
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
            JWTSecurityUtils.getAuthUserFromJWT(authCookie);
            val offerId = requestBody["offerId"]

            if (offerId < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("offerId number must be an integer greater or equal than 0")
            }

            offerService.updateOfferByStatus(offerId, OfferStatus.CANCELLED)
            ResponseEntity.ok("Offer denied")
        } catch (e: OfferNotFoundException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offer not found")
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
            JWTSecurityUtils.getAuthUserFromJWT(authCookie);
            val offerId = requestBody["offerId"]

            if (offerId < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("offerId number must be an integer greater or equal than 0")
            }
    
            val offer = offerService.updateOfferByStatus(offerId, OfferStatus.ACCEPTED)
            ResponseEntity.ok("Offer accepted")
        } catch (e: OfferNotFoundException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offer not found")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
        }
    }
}