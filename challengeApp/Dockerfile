# Use an official Java runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/challengeApp-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port (matches the port your Spring Boot app uses)
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
