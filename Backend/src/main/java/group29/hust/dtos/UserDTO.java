package group29.hust.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private long id;
    private String username;
    private String email;
    private String refreshToken;
    private Instant updatedAt;
    private Instant createdAt;

    private RoleOfUser role;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoleOfUser {
        private long id;
        private String name;
    }
}
