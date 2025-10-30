package group29.hust.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterDTO {
    private long id;
    private String username;
    private String email;
    private Instant updatedAt;
    private Instant createdAt;
}
