package group29.hust.service;

import group29.hust.dtos.request.ClinicalInfoDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.model.ClinicalInfo;
import group29.hust.model.ClinicalService;
import group29.hust.model.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface IClinicalInfoService extends ICrudService<ClinicalInfoDTO, Long> {

    ClinicalInfoDTO findClinicalInfoWithMedicalExamId(Long medicalExamId);
    PaginationResultDTO getAll(Specification<ClinicalService> spec, Pageable pageable);
}
