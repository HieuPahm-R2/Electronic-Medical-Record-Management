package group29.hust.service;

import group29.hust.dtos.request.RegisterDTO;
import group29.hust.exception.BadActionException;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.dtos.UpdateUserDTO;
import group29.hust.dtos.UserDTO;
import group29.hust.model.User;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface IUserService {
    public RegisterDTO create(User data) throws BadActionException;

    public UserDTO getInfo(Long id);

    public PaginationResultDTO getAll(Specification<User> spec, Pageable pageable);

    public void delete(Long id) throws BadActionException;

    public UpdateUserDTO update(User data) throws BadActionException;

    public User handleGetUserByUsername(String username);

    // Authenticate
    public User fetchWithTokenAndEmail(String token, String email);

    public void saveRefreshToken(String token, String email);
}
