package group29.hust.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.dtos.request.PatientDTO;
import group29.hust.model.Patient;

public interface IPatientService extends ICrudService<PatientDTO, Long> {

    PaginationResultDTO getAll(Specification<Patient> spec, Pageable pageable);
}