package com.ci5644.trade.dto

import com.ci5644.trade.models.user.UserEntity
import java.time.LocalDate
import java.time.YearMonth

data class UserDetailsDto(
    var username: String,
    var name: String,
    var email: String,
    var gender: String?,
    var cardNumber: String?,
    var expirationDate: YearMonth?,
    var cvv: String?
) {
    companion object {
        fun fromEntity(entity: UserEntity): UserDetailsDto {
            return UserDetailsDto(
                username = entity.username,
                name = entity.name,
                email = entity.email,
                gender = entity.gender,
                cardNumber = entity.cardNumber,
                expirationDate = if (entity.expirationDate != null) YearMonth.from(entity.expirationDate) else null,
                cvv = entity.cvv
            )
        }
    }

    fun validate(): String? {
        val errorMessage = StringBuilder()
        val localCardNumber = cardNumber
        val localCvv = cvv
        val localExpirationDate = expirationDate

        if (username.length < 5) {
            errorMessage.append("El nombre de usuario debe tener al menos 5 caracteres. \n")
        }

        if (localCardNumber != null && (localCardNumber.length < 13 || localCardNumber.length > 16)) {
            errorMessage.append("El número de tarjeta debe tener entre 13 y 16 dígitos. \n")
        }

        if (localCvv != null && (localCvv.length < 3 || localCvv.length > 4)) {
            errorMessage.append("El CVV debe tener entre 3 y 4 dígitos. \n")
        }

        if (localCardNumber != null && !localCardNumber.matches(Regex("\\d+"))) {
            errorMessage.append("El número de tarjeta debe contener solo dígitos. \n")
        }

        if (localCvv != null && !localCvv.matches(Regex("\\d+"))) {
            errorMessage.append("El CVV debe contener solo dígitos. \n")
        }

        if (localExpirationDate != null && localExpirationDate.isBefore(YearMonth.now())) {
            errorMessage.append("La fecha de expiración de la tarjeta no puede ser anterior a la fecha actual. \n")
        }

        return if (errorMessage.isNotEmpty()) errorMessage.toString() else null
    }

}
