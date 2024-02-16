package com.ci5644.trade.controllers.api

import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.services.card.OwnershipService
import com.ci5644.trade.models.card.CardEntity
import com.ci5644.trade.config.SecurityConstants
import com.ci5644.trade.config.JWT.JWTSecurityUtils
import com.ci5644.trade.services.AuthorizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


/**
 * Controller that contains all the endpoints related to ownership management.
 */
@RestController
@RequestMapping("/api/ownership")
@CrossOrigin(origins = ["http://localhost:3000"], allowCredentials = "true")
class OwnershipController(private val authorizationService: AuthorizationService) {

    @Autowired
    private lateinit var ownershipService: OwnershipService

    /**
     * Retrieves a paginated list of card entities owned by a user.
     *
     * @param requestBody A map containing the request body with keys 'id' for the user ID and 'page' for the page number.
     * @return A response entity containing a json with the list of card entities for the specified page.
     */
    @GetMapping("/get-cards/{pageable}")
    fun getCardsPerPage(
        @CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie : String,
        @PathVariable pageable : Int
    ): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie);
            val user = authorizationService.retrieveUser(username)
            val pageOfOwnedCards = ownershipService.getCardsPerPage(user.id, pageable)
            if (pageOfOwnedCards.size != 0){
                return ResponseEntity.ok(pageOfOwnedCards)
            }
            else{
                return ResponseEntity.notFound().build<Any>()
            }
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
    @GetMapping("/get-progress")
    fun getProgress(@CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String): ResponseEntity<*> {
        return try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie);
            val user = authorizationService.retrieveUser(username)
            val progress = ownershipService.getUserProgress(user.id)
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
    @GetMapping("/get-mundial-progress")
    fun getMundialProgress(@RequestParam(required = false, defaultValue = "3") limit: Int): ResponseEntity<*> {
        return try {
            val mundialProgress = ownershipService.getMostPossessions(limit)
            ResponseEntity.ok(mundialProgress)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }
}
