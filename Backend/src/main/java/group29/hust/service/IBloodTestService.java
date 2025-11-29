package group29.hust.service;

import group29.hust.dtos.request.BloodTestDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBloodTestService extends ICrudService<BloodTestDTO, Long> {
    BloodTestDTO getByMedicalExamId(Long medicalExamId);

}

