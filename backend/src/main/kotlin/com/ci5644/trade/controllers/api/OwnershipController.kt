package com.ci5644.trade.controllers.api

import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.services.card.OwnershipService
import com.ci5644.trade.models.card.CardEntity
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpHeaders;


import org.springframework.web.server.ResponseStatusException

/**
 * Controller that contains all the endpoints related to ownership management.
 */

@RestController
@RequestMapping("/api/ownership")
//@CrossOrigin(origins = ["http://localhost:3000"], allowCredentials = "true")
class OwnershipController {

    @Autowired
    private lateinit var ownershipService: OwnershipService

    /**
     * Retrieves a paginated list of card entities owned by a user.
     *
     * @param requestBody A map containing the request body with keys 'id' for the user ID and 'page' for the page number.
     * @return A response entity containing a json with the list of card entities for the specified page.
     */

    @GetMapping("/get-cards/{userId}/{pageable}")
    //@ResponseBody
    fun getCardsPerPage(
            @PathVariable userId : Long,
            @PathVariable pageable : Int

    ): ResponseEntity<*> {
        try {
            val pageOfOwnedCards = ownershipService.getCardsPerPage(userId, pageable)
            val data = LinkedHashMap<String, Any>()
            data["cards"] = pageOfOwnedCards
            data["user id"] = userId
            if (pageOfOwnedCards.size != 0){
                return ResponseEntity<LinkedHashMap<String,Any>>(data,null,HttpStatus.OK)
            }
            else{
                return ResponseEntity<LinkedHashMap<String,Any>>(data,null,HttpStatus.NOT_FOUND)
            }
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }

    /**
     * Retrieves the progress of a user in owning cards.
     *
     * @param requestBody A map containing the request body with the key 'id' for the user ID.
     * @return A response entity containing a json with the progress of the user.
     */
    @GetMapping("/get-progress/{userId}")
    fun getProgress(@PathVariable userId: Long): ResponseEntity<*> {
        return try {
            val progress = ownershipService.getUserProgress(userId)
            val data = LinkedHashMap<String, Any>()
            data["progress"] = progress
            data["user id"] = userId
            ResponseEntity<LinkedHashMap<String,Any>>(data,null,HttpStatus.OK);
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
    @GetMapping("/get-mundial-progress/limit")
    fun getMundialProgress(@RequestParam(required = false, defaultValue = "3") limit: Int): ResponseEntity<*> {
        return try {
            val mundialProgress = ownershipService.getMostPossessions(limit)
            val data = LinkedHashMap<String, Any>()
            data["mundial progress"] = mundialProgress
            data["limit"] = limit
            ResponseEntity<LinkedHashMap<String,Any>>(data,null,HttpStatus.OK);
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body<Unit>(null)
        }
    }
}
