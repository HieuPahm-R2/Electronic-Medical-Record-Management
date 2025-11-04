package group29.hust.service;

import group29.hust.dtos.request.ClinicalInfoDTO;
import group29.hust.model.ClinicalInfo;

public interface IClinicalInfoService extends ICrudService<ClinicalInfoDTO, Long> {
    ClinicalInfoDTO findClinicalInfoWithPatientId(Long patientId);
}
