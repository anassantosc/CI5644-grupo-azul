import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.2.1"
    id("io.spring.dependency-management") version "1.1.4"
    id("org.flywaydb.flyway") version "10.0.0"
    kotlin("jvm") version "1.9.21"
    kotlin("plugin.spring") version "1.9.21"
    kotlin("plugin.jpa") version "1.9.21"
    kotlin("plugin.allopen") version "1.8.0"
}

group = "com.ci5644"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
    google()
    jcenter()
}

dependencies {
    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    compileOnly("org.projectlombok:lombok")

    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-mustache")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity6:3.1.2.RELEASE")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.postgresql:postgresql")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation("jakarta.validation:jakarta.validation-api:3.0.0")
    implementation("org.hibernate.validator:hibernate-validator:7.0.2.Final")
    implementation("org.projectlombok:lombok:1.18.22")
    testImplementation(kotlin("test"))
    implementation("org.flywaydb:flyway-core")
    implementation("io.jsonwebtoken:jjwt-api:0.11.2")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.2")
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.2")
    implementation("org.springframework.boot:spring-boot-starter-data-rest")
    implementation("org.springframework.boot:spring-boot-starter-logging")
    //implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    //implementation("androidx.annotation:annotation:1.3.0")
    //implementation("com.google.api-client:google-api-client:1.30.8")
    implementation("javax.servlet:javax.servlet-api:4.0.1")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")   
    implementation("org.springframework.security:spring-security-oauth2-client")
}

buildscript {
    dependencies {
        classpath("org.postgresql:postgresql:42.7.1")
    }
}

flyway {
    url = "jdbc:postgresql://azulito-pg:5432/trade-db"
    user = "azulito"
    password = "azul"
}

allOpen {
    annotation("jakarta.persistence.Entity")
    annotation("jakarta.persistence.Embeddable")
    annotation("jakarta.persistence.MappedSuperclass")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
