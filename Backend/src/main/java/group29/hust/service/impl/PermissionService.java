package group29.hust.service.impl;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Permission;
import group29.hust.service.IPermissionService;

@Service
public class PermissionService implements IPermissionService {

    @Override
    public Permission create(Permission data) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public Permission update(Permission data) throws BadActionException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public Permission getById(Long id) throws BadActionException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

    @Override
    public void delete(Long id) throws BadActionException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public PaginationResultDTO fetchAll(Specification<Permission> spec, Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'fetchAll'");
    }

    @Override
    public boolean alreadyExistPermission(Permission data) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'alreadyExistPermission'");
    }

    @Override
    public boolean isEqualName(String s) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'isEqualName'");
    }

}
