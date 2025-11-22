package group29.hust.service;

import group29.hust.dtos.request.RadiologyDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import org.springframework.data.domain.Pageable;

public interface IRadiologyService extends  ICrudService<RadiologyDTO, Long> {
    PaginationResultDTO getByMedicalExamId(Long id, Pageable pageable);
    PaginationResultDTO getByPatientId(Long id, Pageable pageable);
}
