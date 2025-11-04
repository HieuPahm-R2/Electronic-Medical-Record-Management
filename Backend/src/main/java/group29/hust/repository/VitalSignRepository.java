package group29.hust.repository;

import group29.hust.model.VitalSign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VitalSignRepository extends JpaRepository<VitalSign, Long> {
    VitalSign findVitalSignByPatientId(Long patientId);
    VitalSign findVitalSignByMedicalExamId(Long medicalExamId);
}
