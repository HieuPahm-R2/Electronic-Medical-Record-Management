package group29.hust.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Role;

public interface IRoleService {

    Role create(Role data);

    Role update(Role data) throws BadActionException;

    Role fetchById(Long id) throws BadActionException;

    void delete(Long id) throws BadActionException;

    PaginationResultDTO fetchAll(Specification<Role> spec, Pageable pageable);
}
