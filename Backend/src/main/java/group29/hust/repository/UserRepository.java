package group29.hust.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import group29.hust.model.entites.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    User findByRefreshTokenAndEmail(String token, String email);
}
