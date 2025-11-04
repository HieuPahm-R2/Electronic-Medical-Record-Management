package group29.hust.service.impl;

import com.turkraft.springfilter.builder.FilterBuilder;
import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.converter.FilterSpecificationConverter;
import com.turkraft.springfilter.parser.FilterParser;
import com.turkraft.springfilter.parser.node.FilterNode;
import group29.hust.dtos.request.BloodTestDTO;
import group29.hust.dtos.request.ClinicalServiceDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.BloodTest;
import group29.hust.model.ClinicalService;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import group29.hust.repository.BloodTestRepository;
import group29.hust.repository.ClinicalRepository;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.service.IBloodTestService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BloodTestService implements IBloodTestService {

    @Autowired
    FilterBuilder fb;
    @Autowired
    private FilterParser filterParser;
    @Autowired
    private FilterSpecificationConverter filterSpecificationConverter;
    
    private final BloodTestRepository bloodTestRepository;
    private final PatientRepository patientRepository;
    private final ClinicalRepository clinicalRepository;
    private final MedicalExamRepository medicalExamRepository;
    private final ModelMapper modelMapper;

    // Java
    private void validateClinicalServiceAndMedicalExamExist(Long clinicalServiceId, Long medicalExamId) {
        boolean clinicalServiceExists = clinicalRepository.existsById(clinicalServiceId);
        boolean medicalExamExists = medicalExamRepository.existsById(medicalExamId);

        if (clinicalServiceExists && medicalExamExists) {
            throw new BadActionException("Đã tồn tại dữ liệu, Lỗi trùng lặp !");
        }
    }
    
    @Override
    @Transactional
    public BloodTestDTO insert(BloodTestDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new BadActionException("Patient not found with id: " + dto.getPatientId()));
        
        BloodTest bloodTest = modelMapper.map(dto, BloodTest.class);
        bloodTest.setPatient(patient);
        try{
            if (dto.getClinicalServices() != null && dto.getMedicalExamination() != null) {
                validateClinicalServiceAndMedicalExamExist(
                        dto.getClinicalServices().getId(),
                        dto.getMedicalExamination().getId()
                );
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        
        // Handle clinical service association if needed
        if (dto.getClinicalServices() != null) {
            ClinicalService cs = clinicalRepository.findById(dto.getClinicalServices().getId()).orElseThrow(
                    () -> new BadActionException("Clinical service not found with ID: " + dto.getClinicalServices().getId()));
            bloodTest.setClinicalServices(cs);
        }
        if(dto.getMedicalExamination() != null) {
            MedicalExam mde = medicalExamRepository.findById(dto.getMedicalExamination().getId()).orElseThrow(
                            () -> new BadActionException("Medical exam not found with ID: " + dto.getMedicalExamination().getId()));
            bloodTest.setMedicalExamination(mde);
        }
        
        BloodTest savedBloodTest = bloodTestRepository.save(bloodTest);
        return modelMapper.map(savedBloodTest, BloodTestDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public BloodTestDTO getById(Long id) {
        BloodTest bloodTest = bloodTestRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Blood test not found with id: " + id));
        return modelMapper.map(bloodTest, BloodTestDTO.class);
    }

    @Override
    @Transactional
    public BloodTestDTO update(BloodTestDTO dto) throws BadActionException {
        if (dto.getId() == null) {
            throw new BadActionException("Blood test ID cannot be null for update operation");
        }
        
        BloodTest existingBloodTest = bloodTestRepository.findById(dto.getId())
                .orElseThrow(() -> new BadActionException("Blood test not found with id: " + dto.getId()));

        if (dto.getClinicalServices() != null && dto.getMedicalExamination() != null) {
            if(!Objects.equals(dto.getClinicalServices().getId(), existingBloodTest.getClinicalServices().getId())){
                validateClinicalServiceAndMedicalExamExist(
                        dto.getClinicalServices().getId(),
                        dto.getMedicalExamination().getId()
                );
            }

        }
        // Update patient if needed
        if (dto.getPatientId() != null && 
            (existingBloodTest.getPatient() == null || !dto.getPatientId().equals(existingBloodTest.getPatient().getId()))) {
            Patient patient = patientRepository.findById(dto.getPatientId())
                    .orElseThrow(() -> new BadActionException("Patient not found with id: " + dto.getPatientId()));
            existingBloodTest.setPatient(patient);
        }
        if (dto.getClinicalServices() != null) {
            ClinicalService cs = clinicalRepository.findById(dto.getClinicalServices().getId()).orElseThrow(
                    () -> new BadActionException("Clinical service not found with ID: " + dto.getClinicalServices().getId()));
            existingBloodTest.setClinicalServices(cs);
        }
        if(dto.getMedicalExamination() != null) {
            MedicalExam mde = medicalExamRepository.findById(dto.getMedicalExamination().getId()).orElseThrow(
                    () -> new BadActionException("Medical exam not found with ID: " + dto.getMedicalExamination().getId()));
            existingBloodTest.setMedicalExamination(mde);
        }
        existingBloodTest.setBloodGroup( dto.getBloodGroup());
        existingBloodTest.setBloodType( dto.getBloodType());
        existingBloodTest.setConclusion( dto.getConclusion() );
        existingBloodTest.setHb( dto.getHb());
        existingBloodTest.setGlucose( dto.getGlucose() );
        existingBloodTest.setHct( dto.getHct() );
        existingBloodTest.setMch( dto.getMch() );
        existingBloodTest.setMcv( dto.getMcv() );
        existingBloodTest.setImageUrl( dto.getImageUrl());
        existingBloodTest.setNeut( dto.getNeut() );
        existingBloodTest.setWbc( dto.getWbc());
        existingBloodTest.setUrea( dto.getUrea());

        BloodTest updatedBloodTest = bloodTestRepository.save(existingBloodTest);
        return modelMapper.map(updatedBloodTest, BloodTestDTO.class);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!bloodTestRepository.existsById(id)) {
            throw new BadActionException("Blood test not found with id: " + id);
        }
        bloodTestRepository.deleteById(id);
    }
    
    @Transactional(readOnly = true)
    public List<BloodTestDTO> getByPatientId(Long patientId) {
        return bloodTestRepository.findByPatientId(patientId).stream()
                .map(bloodTest -> modelMapper.map(bloodTest, BloodTestDTO.class))
                .collect(Collectors.toList());
    }

@Override
public PaginationResultDTO getByMedicalExamId(Long medicalExamId, Pageable pageable) {
    if (medicalExamId == null) {
        throw new BadActionException("Medical exam ID cannot be null");
    }

    if (!medicalExamRepository.existsById(medicalExamId)) {
        throw new BadActionException("Medical exam ID not found");
    }

    // Create a filter for medicalExam.id property
    FilterNode node = filterParser.parse("medicalExamination.id=" + medicalExamId);
    FilterSpecification<BloodTest> spec = filterSpecificationConverter.convert(node);
    
    // Apply the filter and pagination
    Page<BloodTest> pageResult = bloodTestRepository.findAll(spec, pageable);
    
    // Map to DTOs
    List<BloodTestDTO> content = pageResult.getContent().stream()
            .map(bloodTest -> modelMapper.map(bloodTest, BloodTestDTO.class))
            .collect(Collectors.toList());
    
    // Set up pagination result
    PaginationResultDTO result = new PaginationResultDTO();
    PaginationResultDTO.Meta meta = new PaginationResultDTO.Meta();
    meta.setPage(pageResult.getNumber() + 1);
    meta.setPageSize(pageResult.getSize());
    meta.setTotal(pageResult.getTotalElements());
    meta.setPages(pageResult.getTotalPages());
    
    result.setMeta(meta);
    result.setResult(content);
    
    return result;
}

}