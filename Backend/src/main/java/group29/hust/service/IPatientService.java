package group29.hust.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import group29.hust.model.dtos.PaginationResultDTO;
import group29.hust.model.dtos.PatientDTO;
import group29.hust.model.entites.Patients;

public interface IPatientService extends ICrudService<PatientDTO, Long> {

    PaginationResultDTO getAll(Specification<Patients> spec, Pageable pageable);
}