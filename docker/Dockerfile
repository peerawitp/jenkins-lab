FROM amazoncorretto:22-alpine

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

RUN ./mvnw package -DskipTests

EXPOSE 3000

CMD ["java", "-jar", "target/jenkinslab-0.0.1-SNAPSHOT.jar"]
