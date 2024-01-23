FROM openjdk:17-jdk-alpine3.13

COPY ./backend /backend
WORKDIR /backend

RUN chmod +x ./gradlew
RUN ./gradlew build

EXPOSE 8080

ENTRYPOINT ["java","-jar","./build/libs/trade-0.0.1-SNAPSHOT.jar"]
