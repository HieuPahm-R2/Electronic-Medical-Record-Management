package group29.hust.service.impl;

import com.turkraft.springfilter.builder.FilterBuilder;
import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.converter.FilterSpecificationConverter;
import com.turkraft.springfilter.parser.FilterParser;
import com.turkraft.springfilter.parser.node.FilterNode;
import group29.hust.dtos.request.BloodTestDTO;
import group29.hust.dtos.request.ClinicalServiceDTO;
import group29.hust.dtos.request.MedicalExamDTO;
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

import java.util.*;
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
            throw new BadActionException("Đã tồn tại dữ liệu, Lỗi trùng lặp hihi !");
        }
    }
    
    @Override
    @Transactional
    public BloodTestDTO insert(BloodTestDTO dto) {
        
        BloodTest bloodTest = modelMapper.map(dto, BloodTest.class);
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

        if (dto.getClinicalServices().getId() != null) {
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
        MedicalExamDTO me = MedicalExamDTO.builder()
                .id(updatedBloodTest.getMedicalExamination().getId())
                .build();
        return BloodTestDTO.builder()
                .id(updatedBloodTest.getId())
                .hb(updatedBloodTest.getHb())
                .glucose(updatedBloodTest.getGlucose())
                .hct(updatedBloodTest.getHct())
                .mch(updatedBloodTest.getMch())
                .mcv(updatedBloodTest.getMcv())
                .neut(updatedBloodTest.getNeut())
                .wbc(updatedBloodTest.getWbc())
                .urea(updatedBloodTest.getUrea())
                .conclusion(updatedBloodTest.getConclusion())
                .imageUrl(updatedBloodTest.getImageUrl())
                .clinicalServices(ClinicalServiceDTO.builder()
                        .id(updatedBloodTest.getClinicalServices().getId() != null ? updatedBloodTest.getClinicalServices().getId() : 1)
                        .serviceName(updatedBloodTest.getClinicalServices().getServiceName())
                        .build())
                .bloodType(updatedBloodTest.getBloodType())
                .bloodGroup(updatedBloodTest.getBloodGroup())
                .medicalExamination(me)
                .build();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!bloodTestRepository.existsById(id)) {
            throw new BadActionException("Blood test not found with id: " + id);
        }
        bloodTestRepository.deleteById(id);
    }

@Override
public BloodTestDTO getByMedicalExamId(Long medicalExamId) {
        BloodTest res = bloodTestRepository.findByMedicalExamination_Id(medicalExamId);
        if(res == null) {
            throw new BadActionException("Blood test not found with id: ");
        }
    var clinical = res.getClinicalServices();
    ClinicalServiceDTO cs = ClinicalServiceDTO.builder()
            .id(clinical != null ? res.getClinicalServices().getId() : null)
            .serviceName(clinical != null ? res.getClinicalServices().getServiceName() : "")
            .build();
    MedicalExamDTO me = MedicalExamDTO.builder()
            .id(res.getMedicalExamination().getId())
            .build();
    return BloodTestDTO.builder()
            .id(res.getId())
            .hb(res.getHb())
            .glucose(res.getGlucose())
            .hct(res.getHct())
            .mch(res.getMch())
            .mcv(res.getMcv())
            .neut(res.getNeut())
            .wbc(res.getWbc())
            .urea(res.getUrea())
            .bloodGroup(res.getBloodGroup())
            .bloodType(res.getBloodType())
            .conclusion(res.getConclusion())
            .imageUrl(res.getImageUrl())
            .medicalExamination(me)
            .clinicalServices(cs)
            .build();
}


}