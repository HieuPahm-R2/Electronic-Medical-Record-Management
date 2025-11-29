package group29.hust.service.impl;

import group29.hust.dtos.request.DepartmentDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.model.Department;
import group29.hust.repository.DepartmentRepository;
import group29.hust.service.IDepartmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService implements IDepartmentService {
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public PaginationResultDTO getAll(Specification<Department> spec, Pageable pageable) {
        Page<Department> page = this.departmentRepository.findAll(spec, pageable);
        List<DepartmentDTO> content = page.getContent().stream()
                .map(data -> {
                    modelMapper.map(data, DepartmentDTO.class);
                    return DepartmentDTO.builder()
                            .id(Long.valueOf(data.getId()))
                            .name(data.getName())
                            .build();
                })
                .collect(Collectors.toList());
        PaginationResultDTO rs = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();

        mt.setPage(page.getNumber() + 1);
        mt.setPageSize(page.getSize());
        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(content);
        return rs;
    }
}
