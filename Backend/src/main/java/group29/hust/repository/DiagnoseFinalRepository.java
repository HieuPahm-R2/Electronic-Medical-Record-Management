package group29.hust.repository;

import group29.hust.model.DiagnoseFinal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagnoseFinalRepository extends JpaRepository<DiagnoseFinal, Long> {

    DiagnoseFinal findDiagnoseFinalByMedicalExaminationId(Long medicalExamId);
}
