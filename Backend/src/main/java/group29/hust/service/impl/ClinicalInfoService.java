package group29.hust.service.impl;

import group29.hust.dtos.request.ClinicalInfoDTO;
import group29.hust.dtos.request.ClinicalServiceDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.ClinicalInfo;
import group29.hust.model.ClinicalService;
import group29.hust.model.Permission;
import group29.hust.repository.ClinicalInfoRepository;
import group29.hust.repository.ClinicalRepository;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.service.IClinicalInfoService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ClinicalInfoService implements IClinicalInfoService {

    private final ModelMapper modelMapper;
    private final ClinicalInfoRepository clinicalInfoRepository;
    private final PatientRepository patientRepository;
    private final ClinicalRepository clinicalRepository;
    private final MedicalExamRepository medicalExamRepository;

    @Override
    @Transactional
    public ClinicalInfoDTO insert(ClinicalInfoDTO dto) throws BadActionException {
        // Validate patient exists
        if (!patientRepository.existsById(dto.getPatient().getId())) {
            throw new BadActionException("Patient not found with ID: ");
        }
        ClinicalInfo film = modelMapper.map(dto, ClinicalInfo.class);
        
        // Validate clinical service exists
        if (dto.getClinicalServices() != null) {
            List<Long> reqCate = dto.getClinicalServices().stream().map(ClinicalServiceDTO::getId)
                    .toList();
            Set<ClinicalService> mainCategory = this.clinicalRepository.findByIdIn(reqCate);
            film.setClinicalServices(mainCategory);
        }
        if(dto.getPatient() != null){
            film.setPatient(patientRepository.findById(dto.getPatient().getId())
                    .orElseThrow(() -> new BadActionException("Patient not found with ID: ")));
        }
        if(dto.getMedicalExam() != null){
            film.setMedicalExam(medicalExamRepository.findById(dto.getMedicalExam().getId())
            .orElseThrow(() -> new BadActionException("Medical examination not found with ID: ")));
        }
        
        return modelMapper.map(clinicalInfoRepository.save(film), ClinicalInfoDTO.class);
    }

    @Override
    public ClinicalInfoDTO getById(Long id) {
        return modelMapper.map(clinicalInfoRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Clinical information not found with ID: " + id)), ClinicalInfoDTO.class);
    }

    @Override
    @Transactional
    public ClinicalInfoDTO update(ClinicalInfoDTO dto) throws BadActionException {
        // Check if the clinical info exists

        return modelMapper.map(clinicalInfoRepository.save(modelMapper.map(dto, ClinicalInfo.class)), ClinicalInfoDTO.class);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!clinicalInfoRepository.existsById(id)) {
            throw new BadActionException("Clinical information not found with ID: " + id);
        }
        clinicalInfoRepository.deleteById(id);
    }

    @Override
    public ClinicalInfoDTO findClinicalInfoWithPatientId(Long patientId) {
        ClinicalInfo clinicalInfo = clinicalInfoRepository.findClinicalInfoByPatientId(patientId);
        if (clinicalInfo == null) {
            throw new BadActionException("Clinical information not found for patient with ID: " + patientId);
        }
        return modelMapper.map(clinicalInfo, ClinicalInfoDTO.class) ;
    }

    @Override
    public ClinicalInfoDTO findClinicalInfoWithMedicalExamId(Long medicalExamId) {
        ClinicalInfo clinicalInfo = clinicalInfoRepository.findClinicalInfoByMedicalExamId(medicalExamId);
        if (clinicalInfo == null) {
            throw new BadActionException("Clinical information not found for medical exam with ID: " + medicalExamId);
        }
        return modelMapper.map(clinicalInfo, ClinicalInfoDTO.class);
    }

    @Override
    public PaginationResultDTO getAll(Specification<ClinicalService> spec, Pageable pageable) {
        Page<ClinicalService> page = this.clinicalRepository.findAll(spec, pageable);
        PaginationResultDTO rs = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();

        mt.setPage(page.getNumber() + 1);
        mt.setPageSize(page.getSize());
        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(page.getContent());
        return rs;
    }
}
