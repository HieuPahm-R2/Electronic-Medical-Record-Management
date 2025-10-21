package group29.hust.service.impl;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Permission;
import group29.hust.repository.PermissionRepository;
import group29.hust.service.IPermissionService;

@Service
public class PermissionService implements IPermissionService {
    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public Permission create(Permission data) {
        return this.permissionRepository.save(data);
    }

    @Override
    public Permission update(Permission data) throws BadActionException {
        if (Long.valueOf(data.getId()) == null || this.permissionRepository.findById(data.getId()).isEmpty()) {
            if (this.isEqualName(data.getName())) {
                throw new BadActionException("Dữ liệu bị trùng lặp!!");
            }
        } else {
            if (this.alreadyExistPermission(data)) {
                throw new BadActionException("Dữ liệu đã tồn tại! (có thể do trùng apiPath or module or method)");
            } else {
                Optional<Permission> opt = this.permissionRepository.findById(data.getId());
                if (opt.isPresent()) {
                    data.setCreatedBy(opt.get().getCreatedBy());
                    data.setCreatedTime(opt.get().getCreatedTime());
                    return this.permissionRepository.save(data);
                }
            }
        }
        return null;
    }

    @Override
    public Permission getById(Long id) throws BadActionException {
        Optional<Permission> check = this.permissionRepository.findById(id);
        if (check.isEmpty()) {
            throw new BadActionException("Not Found");
        }
        return check.get();
    }

    @Override
    public void delete(Long id) throws BadActionException {
        Optional<Permission> check = this.permissionRepository.findById(id);
        if (!check.isPresent()) {
            throw new BadActionException("Không tìm thấy dữ liệu!");
        }
        Permission res = check.get();
        res.getRoles().stream().forEach(item -> item.getPermissions().remove(res));
        this.permissionRepository.delete(res);
    }

    @Override
    public PaginationResultDTO fetchAll(Specification<Permission> spec, Pageable pageable) {
        Page<Permission> page = this.permissionRepository.findAll(spec, pageable);
        PaginationResultDTO rs = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();

        mt.setPage(page.getNumber() + 1);
        mt.setPageSize(page.getSize());
        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(page.getContent());
        return rs;
    }

    @Override
    public boolean alreadyExistPermission(Permission data) {
        return this.permissionRepository.existsByModuleAndApiPathAndMethod(data.getModule(), data.getApiPath(),
                data.getMethod());
    }

    @Override
    public boolean isEqualName(String s) {
        return this.permissionRepository.existsByName(s);
    }

}
