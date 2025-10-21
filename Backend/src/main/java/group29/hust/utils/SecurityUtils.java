package group29.hust.utils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.util.Base64;

import group29.hust.dtos.response.ResLoginDTO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SecurityUtils {
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;
    private final JwtEncoder jwtEncoder;

    @Value("${group29.jwt.base64-secret}")
    private String jwtKey;

    @Value("${group29.jwt.access-token-validity-in-seconds}")
    private long accessTokenExpire;

    @Value("${group29.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpire;

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
        } else if (authentication.getPrincipal() instanceof UserDetails springSecurityUser) {
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof Jwt jwt) {
            return jwt.getSubject();
        } else if (authentication.getPrincipal() instanceof String s) {
            return s;
        }
        return null;
    }

    /**
     * @return the login of the current user.
     */
    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(extractPrincipal(securityContext.getAuthentication()));
    }

    /**
     * JWT authentication.
     */
    public SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, JWT_ALGORITHM.getName());
    }

    public Jwt confirmValidRefreshToken(String token) {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(getSecretKey()).macAlgorithm(JWT_ALGORITHM)
                .build();
        try {
            return jwtDecoder.decode(token);
        } catch (Exception e) {
            System.out.println(">>> Refresh_token gets error: " + e.getMessage());
            throw e;
        }
    }

    // =========================
    public String generateAccessToken(String email, ResLoginDTO user) {
        ResLoginDTO.InfoWithinToken token = new ResLoginDTO.InfoWithinToken();
        token.setId(user.getUser().getId());
        token.setEmail(user.getUser().getEmail());
        token.setName(user.getUser().getName());
        // assign to claim
        Instant now = Instant.now();
        Instant validity = now.plus(this.accessTokenExpire, ChronoUnit.SECONDS);

        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
        .issuedAt(now)
        .expiresAt(validity)
        .subject(email)
        .claim("user account", token)
        .build();
        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }
    
    public String generateRefreshToken(String emailLogin, ResLoginDTO resLoginDTO){
        ResLoginDTO.InfoWithinToken data = new ResLoginDTO.InfoWithinToken();
        data.setId(resLoginDTO.getUser().getId());
        data.setEmail(resLoginDTO.getUser().getEmail());
        data.setName(resLoginDTO.getUser().getName());
         // assign to claim
        Instant now = Instant.now();
        Instant validity = now.plus(this.accessTokenExpire, ChronoUnit.SECONDS);
        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
        .issuedAt(now)
        .expiresAt(validity)
        .subject(emailLogin)
        .claim("user account", data)
        .build();
        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }
}
