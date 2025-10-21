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
import group29.hust.model.Role;
import group29.hust.repository.RoleRepository;
import group29.hust.service.impl.RoleService;
import group29.hust.utils.anotation.MessageApi;

@RestController
@RequestMapping("${api.prefix}")
public class RoleController {
    private final RoleService roleService;
    private final RoleRepository roleRepository;

    public RoleController(RoleService roleService, RoleRepository roleRepository) {
        this.roleService = roleService;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/add-role")
    @MessageApi("Add a role")
    public ResponseEntity<Role> create(@RequestBody Role data) throws BadActionException {
        if (this.roleRepository.existsByName(data.getName())) {
            throw new BadActionException("Dữ liệu bị trùng lặp");
        }
        return ResponseEntity.ok().body(this.roleService.create(data));
    }

    @PutMapping("/update-role")
    @MessageApi("Update a role")
    public ResponseEntity<Role> update(@RequestBody Role data) throws BadActionException {
        return ResponseEntity.ok().body(this.roleService.update(data));
    }

    @DeleteMapping("/delete-role/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") long id) throws BadActionException {
        this.roleService.delete(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/roles")
    @MessageApi("fetch all action")
    public ResponseEntity<PaginationResultDTO> handleFetchAllRole(
            @Filter Specification<Role> spec, Pageable pageable) {
        return ResponseEntity.ok().body(this.roleService.fetchAll(spec, pageable));
    }

    @GetMapping("/role/{id}")
    @MessageApi("fetch single item")
    public ResponseEntity<Role> handleFetchSingle(@PathVariable("id") long id) throws BadActionException {
        return ResponseEntity.ok().body(this.roleService.fetchById(id));
    }
}
