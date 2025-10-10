package group29.hust.model.entites;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Username must not be null or blank.")
    private String username;

    @NotBlank(message = "Email must not be null or blank..")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Password not be blank..")
    private String password;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String refreshToken;

}
