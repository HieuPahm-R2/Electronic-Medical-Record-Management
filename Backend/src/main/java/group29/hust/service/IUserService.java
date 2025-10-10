package group29.hust.service;

import group29.hust.exception.BadActionException;
import group29.hust.model.dtos.PaginationResultDTO;
import group29.hust.model.dtos.UpdateUserDTO;
import group29.hust.model.dtos.UserDTO;
import group29.hust.model.entites.User;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface IUserService {
    public UserDTO create(User data) throws BadActionException;

    public UserDTO getInfo(Long id);

    public PaginationResultDTO getAll(Specification<User> spec, Pageable pageable);

    public void delete(Long id) throws BadActionException;

    public UpdateUserDTO update(User data) throws BadActionException;
}
