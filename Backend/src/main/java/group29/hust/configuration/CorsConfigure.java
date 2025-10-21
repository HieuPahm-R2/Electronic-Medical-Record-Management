package group29.hust.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfigure {
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                // Set only one origin to avoid multiple Access-Control-Allow-Origin headers
                configuration.setAllowedOriginPatterns(
                                Arrays.asList("http://localhost:3000", "http://localhost:4173",
                                                "http://localhost:5173"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed
                                                                                                           // methods
                configuration.setAllowedHeaders(
                                Arrays.asList("Authorization", "Content-Type", "Accept", "x-no-retry", "Range"));
                configuration.setExposedHeaders(
                                Arrays.asList("Content-Range", "Accept-Ranges", "Cache-Control", "Pragma", "Expires")); // Expose
                configuration.setAllowCredentials(true);
                configuration.setMaxAge(3600L);

                // How long the response from a pre-flight request can be cached by clients
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration); // Apply this configuration to all paths

                System.out.println(
                                "CORS Configuration loaded with origins: " + configuration.getAllowedOriginPatterns());
                return source;
        }
}
