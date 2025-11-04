package group29.hust.repository;

import group29.hust.model.BloodTest;
import group29.hust.model.ClinicalService;
import group29.hust.model.MedicalExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodTestRepository extends JpaRepository<BloodTest, Long>, JpaSpecificationExecutor<BloodTest> {
    List<BloodTest> findByPatientId(Long patientId);
    
    // For finding tests linked to a clinical service
    BloodTest findByClinicalServices_Id(Long clinicalServiceId);
    
    // For finding tests associated with a medical exam
    List<BloodTest> findByMedicalExamination_Id(Long medicalExamId);
}
