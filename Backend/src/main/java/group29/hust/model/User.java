package group29.hust.model;

import jakarta.persistence.*;
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
@Entity
@Table(name = "users")
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

    @Column(name = "refresh_token", columnDefinition = "MEDIUMTEXT")
    private String refreshToken;

    // relationships: ---
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, optional = true)
    private Patient patient; //
}
