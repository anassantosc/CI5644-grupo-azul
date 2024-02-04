package com.ci5644.trade.controllers.api

import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.services.card.OwnershipService
import com.ci5644.trade.models.card.CardEntity
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


/**
 * Controller that contains all the endpoints related to ownership management.
 */
@RestController
@RequestMapping("/api/ownership")
class OwnershipController {

    @Autowired
    private lateinit var ownershipService: OwnershipService

    /**
     * Retrieves a paginated list of card entities owned by a user.
     *
     * @param requestBody A map containing the request body with keys 'id' for the user ID and 'page' for the page number.
     * @return A response entity containing the list of card entities for the specified page.
     */
    @GetMapping("/GetPageableCard")
    fun getCardsPerPage(
        @RequestParam("id") userId: Long,
        @RequestParam("page") pageable: Int
    ): ResponseEntity<*> {
        return try {
            val pageOfOwnedCards = ownershipService.getCardsPerPage(userId, pageable)
            ResponseEntity.ok(pageOfOwnedCards)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }

    /**
     * Retrieves the progress of a user in owning cards.
     *
     * @param requestBody A map containing the request body with the key 'id' for the user ID.
     * @return A response entity containing the progress of the user.
     */
    @GetMapping("/getProgress")
    fun getProgress(@RequestParam("id") userId: Long): ResponseEntity<*> {
        return try {
            val progress = ownershipService.getUserProgress(userId)
            ResponseEntity.ok(progress)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }

    /**
     * Retrieves the progress of users in owning cards worldwide.
     *
     * @param limit The maximum number of users to return the progress for.
     * @return A response entity containing a list of pairs representing the progress of users.
     */
    @GetMapping("/getMundialProgress")
    fun getMundialProgress(@RequestParam(required = false, defaultValue = "3") limit: Int): ResponseEntity<*> {
        return try {
            val mundialProgress = ownershipService.getMostPossessions(limit)
            ResponseEntity.ok(mundialProgress)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }
}
