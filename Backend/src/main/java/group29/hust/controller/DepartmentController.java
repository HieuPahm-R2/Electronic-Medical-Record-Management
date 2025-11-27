package group29.hust.controller;

import com.turkraft.springfilter.boot.Filter;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.model.Department;
import group29.hust.model.Role;
import group29.hust.service.impl.DepartmentService;
import group29.hust.utils.anotation.MessageApi;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping("")
    @MessageApi("fetch all action")
    public ResponseEntity<PaginationResultDTO> handleFetchAllRole(
            @Filter Specification<Department> spec, Pageable pageable) {
        return ResponseEntity.ok().body(this.departmentService.getAll(spec, pageable));
    }
}
