# Use a base image with Java 17 (or your required Java version)
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the target directory into the container
COPY target/NoteTaker-*.jar app.jar

# Expose the backend application port
EXPOSE 8080

# Define the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]