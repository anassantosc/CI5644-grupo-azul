package com.ci5644.trade.controllers.api

import com.ci5644.trade.services.card.OwnershipService
import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


/**
 * Controller that contains all the endpoints related to ownership management.
 */
@RestController
@RequestMapping("/api/ownership")
class OwnershipController() {

    @Autowired
    private lateinit var ownershipService: OwnershipService

    /**
     * Retrieves a paginated list of card entities owned by a user.
     *
     * @param requestBody A map containing the request body with keys 'id' for the user ID and 'page' for the page number.
     * @return A response entity containing a json with the list of card entities for the specified page.
     */
    @GetMapping()
    fun getCardsPerPage(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie : String,
        @RequestBody requestBody: Map<String, Int>
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
            val page = requestBody["page"] 

            if (page == null || page < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Page number must be an integer greater or equal than 0")
            }

            val pageOfOwnedCards = ownershipService.getCardsPerPage(username, page)
            ResponseEntity.ok(pageOfOwnedCards)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }

    /**
     * Retrieves the progress of a user in owning cards.
     *
     * @param requestBody A map containing the request body with the key 'id' for the user ID.
     * @return A response entity containing a json with the progress of the user.
     */
    @GetMapping("/progress")
    fun getProgress(@CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
            val progress = ownershipService.getUserProgress(username)
            ResponseEntity.ok(progress)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }


    /**
     * Retrieves the progress of users in owning cards worldwide.
     *
     * @param limit The maximum number of users to return the progress for.
     * @return A response entity containing a json with a list of pairs representing the progress of users.
     */
    @GetMapping("/top-progress")
    fun getTopProgress(@RequestBody requestBody: Map<String, Int>): ResponseEntity<*> {
        return try {
            var limit = requestBody["limit"] ?: 3
            if (limit <= 0) limit = 3

            val topProgress = ownershipService.getMostPossessions(limit)
            ResponseEntity.ok(topProgress)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }


    /**
     * Retrieves a paginated list of the cards with quantity > 1.
     *
     * @param requestBody A map containing the request body with the key 'id' for the user ID and 'page' for the page number.
     * @return A response entity containing a json with the list of card entities for the specified page.
     */
    @GetMapping("/duplicated")
    fun getDuplicatedCards(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @PathVariable page: Int
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie) 

            if (page < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Page number must be an integer greater or equal than 0")
            }

            val duplicatedCards = ownershipService.getDuplicatedCards(username, page)
            ResponseEntity.ok(duplicatedCards)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }

    /**
     * Retrieves a paginated list of the cards that the user does not own.
     *
     * @param requestBody A map containing the request body with the key 'id' for the user ID and 'page' for the page number.
     * @return A response entity containing a json with the list of card entities for the specified page.
     */
    @GetMapping("/wishlist")
    fun getWishList(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String,
        @PathVariable page: Int
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
            
            if (page < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Page number must be an integer greater or equal than 0")
            }

            val nonOwnedCards = ownershipService.getNonOwnedCards(username, page)
            ResponseEntity.ok(nonOwnedCards)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }
}
