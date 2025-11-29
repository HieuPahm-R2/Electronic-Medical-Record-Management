package group29.hust.repository;

import group29.hust.model.MedicalExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MedicalExamRepository extends JpaRepository<MedicalExam, Long>, JpaSpecificationExecutor<MedicalExam> {
    MedicalExam findMedicalExamByPatientId(Long patientId);
}
