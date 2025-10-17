package group29.hust.service.impl;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import group29.hust.exception.BadActionException;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.dtos.request.PatientDTO;
import group29.hust.model.Patient;
import group29.hust.repository.PatientRepository;
import group29.hust.service.IPatientService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService implements IPatientService {
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Override
    public PatientDTO insert(PatientDTO dto) {
        return modelMapper.map(patientRepository.save(modelMapper.map(dto, Patient.class)), PatientDTO.class);
    }

    @Override
    public PatientDTO getById(Long id) {
        return modelMapper.map(this.patientRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Patient not found with id: " + id)), PatientDTO.class);
    }

    @Override
    public PatientDTO update(PatientDTO dto) throws BadActionException {
        Optional<Patient> patient = patientRepository.findById(dto.getId());
        if (patient.isEmpty()) {
            throw new BadActionException("Patient not found with id: " + dto.getId());
        }
        if (dto.getFullName() != null) {
            patient.get().setFullName(dto.getFullName());
        }
        if (dto.getDateOfBirth() != null) {
            patient.get().setDateOfBirth(dto.getDateOfBirth());
        }
        if (dto.getEmail() != null) {
            patient.get().setEmail(dto.getEmail());
        }
        if (dto.getPhone() != null) {
            patient.get().setPhone(dto.getPhone());
        }
        if (dto.getNationality() != null) {
            patient.get().setNationality(dto.getNationality());
        }
        if (dto.getAddress() != null) {
            patient.get().setAddress(dto.getAddress());
        }
        if (dto.getIdentityCard() != null) {
            patient.get().setIdentityCard(dto.getIdentityCard());
        }
        if (dto.getInsuranceNumber() != null) {
            patient.get().setInsuranceNumber(dto.getInsuranceNumber());
        }
        if (dto.getRelativeName() != null) {
            patient.get().setRelativeName(dto.getRelativeName());
        }
        if (dto.getRelativePhone() != null) {
            patient.get().setRelativePhone(dto.getRelativePhone());
        }
        return modelMapper.map(patientRepository.save(patient.get()), PatientDTO.class);
    }

    @Override
    public void delete(Long id) {
        this.patientRepository.deleteById(id);
    }

    @Override
    public PaginationResultDTO getAll(Specification<Patient> spec, Pageable pageable) {
        Page<Patient> pageCheck = this.patientRepository.findAll(spec, pageable);
        PaginationResultDTO res = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();
        mt.setPage(pageCheck.getNumber() + 1);
        mt.setPageSize(pageCheck.getSize());
        mt.setPages(pageCheck.getTotalPages());
        mt.setTotal(pageCheck.getTotalElements());
        res.setMeta(mt);
        // remove sensitive data
        res.setResult(pageCheck.getContent());
        return res;
    }

}
