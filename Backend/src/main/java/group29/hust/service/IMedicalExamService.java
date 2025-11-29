package group29.hust.service;

import group29.hust.dtos.request.MedicalExamDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import org.springframework.data.domain.Pageable;

public interface IMedicalExamService extends ICrudService<MedicalExamDTO, Long> {
    public PaginationResultDTO findMedicalExamWithPatientId(Long patientId, Pageable pageable);
}
