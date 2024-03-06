import com.ci5644.trade.controllers.auth.AuthenticationController
import com.ci5644.trade.dto.auth.LoginDTO
import com.ci5644.trade.dto.auth.RegisterDTO
import com.ci5644.trade.models.user.UserEntity
import com.ci5644.trade.services.auth.AuthorizationService
import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.http.Cookie
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito
import org.springframework.http.HttpHeaders
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.http.HttpCookie
import org.springframework.http.MediaType
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

/**
 * This class tests the AuthenticationController.
 * It uses Mockito to mock the AuthorizationService.
 */
@ExtendWith(MockitoExtension::class)
class AuthenticationControllerTest {

    @Mock
    private lateinit var authService: AuthorizationService

    @InjectMocks
    private lateinit var authController: AuthenticationController

    private lateinit var mockMvc: MockMvc

    private lateinit var objectMapper: ObjectMapper

    /**
     * This method sets up the test environment before each test.
     */
    @BeforeEach
    fun setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build()
        objectMapper = ObjectMapper()
    }

    /**
     * This test checks if the login request returns OK and sets a cookie when credentials are valid.
     */
    @Test
    fun `loginReq should return OK and set a cookie when credentials are valid`() {
        // Prepare
        val loginDTO = LoginDTO("simonpuyosa", "alluhakbar")

        // Simulate the behavior of authService.loginUser
        val mockCookie = HttpCookie("jwt", "mockJwtToken")
        Mockito.`when`(authService.loginUser(loginDTO.username, loginDTO.password)).thenReturn(mockCookie)

        // Execute and verify
        mockMvc.perform(
            post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO))
        )
            .andExpect(status().isOk)
            .andExpect(header().exists(HttpHeaders.SET_COOKIE))
    }

    /**
     * This test checks if the login request returns Unauthorized when credentials are invalid.
     */
    @Test
    fun `loginReq should return Unauthorized when credentials are invalid`() {
        // Prepare
        val loginDTO = LoginDTO("invalidUsername", "invalidPassword")

        // Simulate the behavior of authService.loginUser
        Mockito.`when`(authService.loginUser(loginDTO.username, loginDTO.password))
            .thenThrow(UsernameNotFoundException("User not found"))

        // Execute and verify
        mockMvc.perform(
            post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO))
        )
            .andExpect(status().isBadRequest())
    }

    /**
     * This test checks if the registerUser request returns OK when registration data is valid and user can login.
     */
    @Test
    fun `registerUser should return OK when registration data is valid and user can login`() {
        // Prepare
        val registerDTO = RegisterDTO(
            username = "username",
            password = "password",
            name = "Test User",
            email = "testuser@example.com",
            gender = null
        )

        // Simulate the behavior of authService.registerUser
        val mockUserEntity = UserEntity(
            username = registerDTO.username,
            password = registerDTO.password,
            name = registerDTO.name,
            email = registerDTO.email,
            gender = registerDTO.gender
        )
        Mockito.`when`(authService.registerUser(registerDTO)).thenReturn(mockUserEntity)

        // Execute and verify the registration
        mockMvc.perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDTO))
        )
            .andExpect(status().isOk)

        // Prepare the login credentials
        val loginDTO = LoginDTO(registerDTO.username, registerDTO.password)

        // Simulate the behavior of authService.loginUser
        val mockCookie = HttpCookie("jwt", "mockJwtToken")
        Mockito.`when`(authService.loginUser(loginDTO.username, loginDTO.password)).thenReturn(mockCookie)

        // Execute and verify the login
        mockMvc.perform(
            post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO))
        )
            .andExpect(status().isOk)
            .andExpect(header().exists(HttpHeaders.SET_COOKIE))
    }

    /**
     * This test checks if the logoutUser request returns OK when JWT cookie is valid.
     */
    @Test
    fun `logoutUser should return OK when JWT cookie is valid`() {
        // Prepare a valid JWT cookie
        val jwtCookie = "JWT=mockJwtToken"

        // Execute and verify the logout request
        mockMvc.perform(
            get("/auth/logout")
                .cookie(Cookie("JWT", jwtCookie))
        )
            .andExpect(status().isOk)
    }
}


