package com.ensolversTest.NoteTaker.Controllers.Cors;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @SuppressWarnings("null")
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permitir todas las rutas
                        .allowedOrigins("*") // Permitir origen del frontend
                        .allowedMethods("*") // Métodos permitidos
                        .allowedHeaders("*"); // Permitir todos los headers
                        //.allowCredentials(true); // Permitir cookies si es necesario
            }
        };
    }
}