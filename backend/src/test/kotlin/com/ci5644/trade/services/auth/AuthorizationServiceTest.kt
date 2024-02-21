// import com.ci5644.trade.dto.auth.RegisterDTO
// import com.ci5644.trade.exceptions.runtime.UsernameTakenException
// import com.ci5644.trade.models.user.UserEntity
// import com.ci5644.trade.repositories.UserRepository
// import com.ci5644.trade.services.auth.AuthorizationService
// import org.junit.jupiter.api.Assertions.*
// import org.springframework.security.core.Authentication
// import org.junit.jupiter.api.Test
// import org.junit.jupiter.api.extension.ExtendWith
// import org.mockito.InjectMocks
// import org.mockito.Mock
// import org.mockito.Mockito
// import org.mockito.junit.jupiter.MockitoExtension
// import org.springframework.security.authentication.AuthenticationManager
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
// import org.springframework.security.core.userdetails.UsernameNotFoundException

// /**
//  * This class contains unit tests for the AuthorizationService class.
//  * It uses Mockito to mock the UserRepository and AuthenticationManager dependencies.
//  */
// @ExtendWith(MockitoExtension::class)
// class AuthorizationServiceTest {

//     // Mocked UserRepository instance
//     @Mock
//     lateinit var userRepository: UserRepository

//     // Mocked AuthenticationManager instance
//     @Mock
//     lateinit var authenticationManager: AuthenticationManager

//     // Injected AuthorizationService instance with mocked dependencies
//     @InjectMocks
//     private lateinit var authorizationService: AuthorizationService

//     /**
//      * Test case for the retrieveUser method when the username exists.
//      * It checks if the returned UserEntity is the same as the expected one.
//      */
//     @Test
//     fun `retrieveUser should return UserEntity when username exists`() {
//         val username = "testUser"
//         val userEntity =
//             UserEntity(username.hashCode(), "username", "password", "User Test", "testuser@example.com", "Male")
//         Mockito.`when`(userRepository.existsByUsername(username)).thenReturn(true)
//         Mockito.`when`(userRepository.findByUsername(username)).thenReturn(userEntity)

//         val result = authorizationService.retrieveUser(username)

//         assertEquals(userEntity, result)
//     }

//     /**
//      * Test case for the retrieveUser method when the username does not exist.
//      * It checks if a UsernameNotFoundException is thrown.
//      */
//     @Test
//     fun `retrieveUser should throw UsernameNotFoundException when username does not exist`() {
//         val username = "testUser"
//         Mockito.`when`(userRepository.existsByUsername(username)).thenReturn(false)

//         assertThrows(UsernameNotFoundException::class.java) {
//             authorizationService.retrieveUser(username)
//         }
//     }

//     /**
//      * Test case for the registerUser method when the username is not taken.
//      * It checks if the returned UserEntity is the same as the expected one.
//      */
//     @Test
//     fun `registerUser should return UserEntity when username is not taken`() {
//         val registerDTO = RegisterDTO("testUser", "password", "Test User", "testuser@example.com", "Male")
//         val userEntity = UserEntity(
//             registerDTO.username.hashCode(),
//             registerDTO.username,
//             registerDTO.password,
//             registerDTO.name,
//             registerDTO.email,
//             registerDTO.gender
//         )
//         Mockito.`when`(userRepository.existsByUsername(registerDTO.username)).thenReturn(false)
//         //Mockito.`when`(userRepository.save(Mockito.any(UserEntity::class.java))).thenReturn(userEntity)

//         //val result = authorizationService.registerUser(registerDTO)

//         //assertEquals(userEntity, result)
//     }

//     /**
//      * Test case for the registerUser method when the username is taken.
//      * It checks if a UsernameTakenException is thrown.
//      */
//     @Test
//     fun `registerUser should throw UsernameTakenException when username is taken`() {
//         val registerDTO = RegisterDTO("testUser", "password", "Test User", "testuser@example.com", "Male")
//         Mockito.`when`(userRepository.existsByUsername(registerDTO.username)).thenReturn(true)

//         assertThrows(UsernameTakenException::class.java) {
//             authorizationService.registerUser(registerDTO)
//         }
//     }

//     /**
//      * Test case for the loginUser method when the credentials are valid.
//      * It checks if the returned HttpCookie is not null.
//      */
//     @Test
//     fun `loginUser should return HttpCookie when credentials are valid`() {
//         val username = "testUser"
//         val password = "password"
//         val userEntity =
//             UserEntity(username.hashCode(), username, password, "Test User", "testuser@example.com", "Male")
//         val auth = Mockito.mock(Authentication::class.java)

//         Mockito.`when`(userRepository.existsByUsername(username)).thenReturn(true)
//         Mockito.`when`(userRepository.findByUsername(username)).thenReturn(userEntity)
//         //Mockito.`when`(authenticationManager.authenticate(UsernamePasswordAuthenticationToken(username, password)))
//         //    .thenReturn(auth)

//         //val result = authorizationService.loginUser(username, password)

//         //assertNotNull(result)
//     }
// }

