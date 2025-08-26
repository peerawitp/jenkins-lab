# Build Stage
FROM maven:3.9.11-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src src
RUN mvn clean install

# Runtime Stage
FROM openjdk:26-oraclelinux9
USER 1000
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY --from=build /app/${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","-Xms128M","-Xmx256M","-server","-XX:+UseParallelGC","/app.jar"]
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Bangkok","/app.jar"]
