package group29.hust.repository;

import group29.hust.model.ClinicalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicalInfoRepository extends JpaRepository<ClinicalInfo, Long> {
    ClinicalInfo findClinicalInfoByPatientId(Long patientId);
    ClinicalInfo findClinicalInfoByMedicalExamId(Long medicalExamId);
}
