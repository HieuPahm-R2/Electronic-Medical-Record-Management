package group29.hust.service;

import group29.hust.dtos.request.RadiologyDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import org.springframework.data.domain.Pageable;

public interface IRadiologyService extends  ICrudService<RadiologyDTO, Long> {
    RadiologyDTO getByMedicalExamId(Long id);

}
