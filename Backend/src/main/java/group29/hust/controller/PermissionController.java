package group29.hust.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turkraft.springfilter.boot.Filter;

import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Permission;
import group29.hust.service.impl.PermissionService;
import group29.hust.utils.anotation.MessageApi;

@RestController
@RequestMapping("${api.prefix}")
public class PermissionController {
    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @PostMapping("/add-permission")
    @MessageApi("Add a permission")
    public ResponseEntity<Permission> create(@RequestBody Permission data) throws BadActionException {
        if (this.permissionService.alreadyExistPermission(data)) {
            throw new BadActionException("Đã tồn tại, hãy thử lại!");
        }
        return ResponseEntity.ok().body(this.permissionService.create(data));
    }

    @PutMapping("/update-permission")
    @MessageApi("Update a permission")
    public ResponseEntity<Permission> update(@RequestBody Permission data) throws BadActionException {
        return ResponseEntity.ok().body(this.permissionService.update(data));
    }

    @DeleteMapping("/delete-permission/{id}")
    @MessageApi("Delete action - permission domain")
    public ResponseEntity<Void> handleDelete(@PathVariable("id") long id) throws BadActionException {
        this.permissionService.delete(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/permission/{id}")
    public ResponseEntity<Permission> getById(@PathVariable long id) throws BadActionException {
        return ResponseEntity.ok().body(this.permissionService.getById(id));
    }

    @GetMapping("/permissions")
    @MessageApi("fetch all - permission domain")
    public ResponseEntity<PaginationResultDTO> handleFetchAllPermission(
            @Filter Specification<Permission> spec, Pageable pageable) {
        return ResponseEntity.ok().body(this.permissionService.fetchAll(spec, pageable));
    }
}
