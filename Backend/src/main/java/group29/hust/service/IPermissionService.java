package group29.hust.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Permission;

public interface IPermissionService {

    Permission create(Permission data);

    Permission update(Permission data) throws BadActionException;

    Permission getById(Long id) throws BadActionException;

    void delete(Long id) throws BadActionException;

    PaginationResultDTO fetchAll(Specification<Permission> spec, Pageable pageable);

    boolean alreadyExistPermission(Permission data);

    boolean isEqualName(String s);
}
