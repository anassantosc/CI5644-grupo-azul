package com.ci5644.trade

import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate

@SpringBootTest
class TradeApplicationTests(@Autowired val restTemplate: TestRestTemplate) {

	@BeforeAll
	fun setup() {
		println(">> Setup")
	}

	@AfterAll
	fun teardown() {
		println(">> Tear down")
	}

}
