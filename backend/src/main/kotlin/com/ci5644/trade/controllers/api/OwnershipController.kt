package com.ci5644.trade.controllers.api

//import com.ci5644.trade.constants.SecurityConstants
import com.ci5644.trade.models.user.UserEntity
//import com.ci5644.trade.services.AuthorizationService
import com.ci5644.trade.services.card.OwnershipService
//import com.ci5644.trade.utils.JWTSecurityUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController

/**
 * Controller that contains all the endpoints to the admin functionalities
 */
@RestController
class OwnershipController {

    @Autowired
    private lateinit var ownershipService: OwnershipService

    //@Autowired
    //private lateinit var authService: AuthorizationService

    /*
    @GetMapping("/api/ownership/getProgress")
    fun getProgress(@CookieValue(name = SecurityConstants.AUTH_COOKIE_NAME) authCookie: String): ResponseEntity<Int> {
        try {
            val username = JWTSecurityUtils.getAuthUserFromJWT(authCookie)
            val user: UserEntity = authService.retrieveUser(username)
            val cardNumbers: Int = ownershipService.getOwnedCards(user.userId)
            return ResponseEntity.ok(cardNumbers)
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }
    */

}
