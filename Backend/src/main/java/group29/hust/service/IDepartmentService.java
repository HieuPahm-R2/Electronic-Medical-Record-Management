package group29.hust.service;

import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.model.Department;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface IDepartmentService {
    PaginationResultDTO getAll(Specification<Department> spec, Pageable pageable);
}
