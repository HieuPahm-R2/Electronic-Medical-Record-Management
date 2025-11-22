package group29.hust.repository;

import group29.hust.model.MedicalExam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalExamRepository extends JpaRepository<MedicalExam, Long> {
    MedicalExam findMedicalExamByPatientId(Long patientId);
}
