package group29.hust.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import group29.hust.model.entites.Patients;

public interface PatientRepository extends JpaRepository<Patients, Long>, JpaSpecificationExecutor<Patients> {
}
