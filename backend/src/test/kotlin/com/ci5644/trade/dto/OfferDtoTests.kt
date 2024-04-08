package com.ci5644.trade.dto

import com.ci5644.trade.dto.OfferDto

import org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

class OfferDtoTest {

    @Autowired
    lateinit var offerDto: OfferDto

    @Test
    fun `OfferDto should be able to be created`() {
        val offerDto = OfferDto(
            id = 1,
            userOffer = 1,
            userReceive = 1,
            cardOffer = 1,
            cardReceive = 1,
            status = "test"
        )

        assertThat(offerDto.id).isEqualTo(1)
        assertThat(offerDto.userOffer).isEqualTo(1)
        assertThat(offerDto.userReceive).isEqualTo(1)
        assertThat(offerDto.cardOffer).isEqualTo(1)
        assertThat(offerDto.cardReceive).isEqualTo(1)
        assertThat(offerDto.status).isEqualTo("test")
    }
}