package group29.hust.repository;

import group29.hust.model.Radiology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface RadiologyRepository extends JpaRepository<Radiology, Long>, JpaSpecificationExecutor<Radiology> {
    List<Radiology> findByPatientId(Long patientId);
}
