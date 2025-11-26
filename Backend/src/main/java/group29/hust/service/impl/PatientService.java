package group29.hust.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import group29.hust.model.*;
import group29.hust.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import group29.hust.exception.BadActionException;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.dtos.request.PatientDTO;
import group29.hust.service.IPatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientService implements IPatientService {
    private final PatientRepository patientRepository;
    private final RadiologyRepository radiologyRepository;
    private final ClinicalInfoRepository clinicalInfoRepository;
    private final MedicalExamRepository medicalExamRepository;
    private final VitalSignRepository vitalSignRepository;
    private final BloodTestRepository bloodTestRepository;
    private final DiagnoseFinalRepository diagnoseFinalRepository;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public PatientDTO insert(PatientDTO dto) {
        Patient res = patientRepository.save(modelMapper.map(dto, Patient.class));
        // init
        MedicalExam me = new MedicalExam();
        VitalSign vt = new VitalSign();
        Radiology rg = new Radiology();
        ClinicalInfo clinicalInfo = new ClinicalInfo();
        BloodTest bt = new BloodTest();
        DiagnoseFinal dg = new DiagnoseFinal();

        me.setPatient(res);
        MedicalExam meFinal = medicalExamRepository.save(me);
        // set value vital sign
        vt.setPatient(res);
        vt.setMedicalExam(meFinal);
        vitalSignRepository.save(vt);
        // set value blood test
        bt.setPatient(res);
        bt.setMedicalExamination(meFinal);
        bloodTestRepository.save(bt);

        // set value radiology
        rg.setPatient(res);
        rg.setMedicalExamination(meFinal);
        radiologyRepository.save(rg);
        // set value clinical info
        clinicalInfo.setPatient(res);
        clinicalInfo.setMedicalExam(meFinal);
        clinicalInfoRepository.save(clinicalInfo);
        // set value diagnose final
        dg.setPatient(res);
        dg.setMedicalExamination(meFinal);
        diagnoseFinalRepository.save(dg);

        return modelMapper.map((res), PatientDTO.class);
    }

    @Override
    public PatientDTO getById(Long id) {
        return modelMapper.map(this.patientRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Patient not found with id: " + id)), PatientDTO.class);
    }

    @Transactional
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

    @Transactional
    @Override
    public void delete(Long id) {
        this.patientRepository.deleteById(id);
    }

    @Override
    public PaginationResultDTO getAll(Specification<Patient> spec, Pageable pageable) {
        Page<Patient> pageCheck = this.patientRepository.findAll(spec, pageable);
        // Map to DTOs
        List<PatientDTO> content = pageCheck.getContent().stream()
                .map(data -> {
                    modelMapper.map(data, PatientDTO.class);
                    return PatientDTO.builder()
                            .id(data.getId())
                            .fullName(data.getFullName())
                            .dateOfBirth(data.getDateOfBirth())
                            .email(data.getEmail())
                            .phone(data.getPhone())
                            .patientCode(data.getPatientCode())
                            .address(data.getAddress())
                            .updatedBy(data.getUpdatedBy())
                            .createdBy(data.getCreatedBy())
                            .updatedAt(data.getUpdatedAt())
                            .createdAt(data.getCreatedAt())
                            .build();
                })
                .collect(Collectors.toList());

        PaginationResultDTO res = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();
        mt.setPage(pageCheck.getNumber() + 1);
        mt.setPageSize(pageCheck.getSize());
        mt.setPages(pageCheck.getTotalPages());
        mt.setTotal(pageCheck.getTotalElements());
        res.setMeta(mt);
        // remove sensitive data
        res.setResult(content);
        return res;
    }

}
