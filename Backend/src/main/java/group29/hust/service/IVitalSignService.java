package group29.hust.service;

import group29.hust.dtos.request.VitalSignDTO;
import org.springframework.data.domain.Pageable;

public interface IVitalSignService extends ICrudService<VitalSignDTO, Long> {
    VitalSignDTO findVitalSignWithMedicalExamId(Long medicalExamId);
}
