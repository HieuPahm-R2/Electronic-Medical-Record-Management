package group29.hust.service.impl;

import com.turkraft.springfilter.builder.FilterBuilder;
import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.converter.FilterSpecificationConverter;
import com.turkraft.springfilter.parser.FilterParser;
import com.turkraft.springfilter.parser.node.FilterNode;
import group29.hust.dtos.request.BloodTestDTO;
import group29.hust.dtos.request.ClinicalServiceDTO;
import group29.hust.dtos.request.PatientDTO;
import group29.hust.dtos.request.RadiologyDTO;
import group29.hust.dtos.response.MedicalExamRes;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.*;
import group29.hust.repository.ClinicalRepository;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.repository.RadiologyRepository;
import group29.hust.service.IRadiologyService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RadiologyService implements IRadiologyService {


    private final RadiologyRepository radiologyRepository;
    private final PatientRepository patientRepository;
    private final ClinicalRepository clinicalRepository;
    private final MedicalExamRepository medicalExamRepository;
    private final ModelMapper modelMapper;

    private MedicalExamRes convertDtoMedicalExam(Radiology data){
        return MedicalExamRes.builder()
                .department(data.getMedicalExamination().getDepartment().getName())
                .id(data.getMedicalExamination().getId())
                .build();
    }
    private ClinicalServiceDTO convertDtoClinical(Radiology data){
        return ClinicalServiceDTO.builder()
                .serviceName(data.getClinicalService() != null ? data.getClinicalService().getServiceName() : "")
                .id(data.getClinicalService() != null ? data.getClinicalService().getId() : null)
                .build();
    }

    @Override
    @Transactional
    public RadiologyDTO insert(RadiologyDTO dto) {

        Radiology radiology = modelMapper.map(dto, Radiology.class);

        // Handle clinical service association
        if (dto.getClinicalService() != null) {
            ClinicalService clinicalService = clinicalRepository.findById(dto.getClinicalService().getId())
                    .orElseThrow(() -> new BadActionException("Clinical service not found with id: " + 
                            dto.getClinicalService().getId()));
            radiology.setClinicalService(clinicalService);
        }

        // Handle medical exam association if provided
        if (dto.getMedicalExam().getId() != null) {
            MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExam().getId())
                    .orElseThrow(() -> new BadActionException("Medical exam not found with id: "));
            radiology.setMedicalExamination(medicalExam);
        }

        Radiology savedRadiology = radiologyRepository.save(radiology);

        return RadiologyDTO.builder()
                .id(savedRadiology.getId())
                .imagePath(savedRadiology.getImagePath())
                .conclusion(savedRadiology.getConclusion())
                .clinicalService(convertDtoClinical(savedRadiology))
                .medicalExam(convertDtoMedicalExam(savedRadiology))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public RadiologyDTO getById(Long id) {
        Radiology radiology = radiologyRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Radiology not found with id: " + id));
        return modelMapper.map(radiology, RadiologyDTO.class);
    }

    @Override
    @Transactional
    public RadiologyDTO update(RadiologyDTO dto) throws BadActionException {
        if (dto.getId() == null) {
            throw new BadActionException("Radiology ID cannot be null for update operation");
        }

        Radiology existingRadiology = radiologyRepository.findById(dto.getId())
                .orElseThrow(() -> new BadActionException("Radiology not found with id: " + dto.getId()));

        // Update basic fields
        existingRadiology.setImagePath(dto.getImagePath());
        existingRadiology.setConclusion(dto.getConclusion());


        // Update clinical service association if needed
        if (dto.getClinicalService() != null) {
            ClinicalService clinicalService = clinicalRepository.findById(dto.getClinicalService().getId())
                    .orElseThrow(() -> new BadActionException("Clinical service not found with id: " + 
                            dto.getClinicalService().getId()));
            existingRadiology.setClinicalService(clinicalService);
        }

        // Update medical exam association if needed
        if (dto.getMedicalExam().getId() != null) {
            MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExam().getId())
                    .orElseThrow(() -> new BadActionException("Medical exam not found with id: " + 
                            dto.getMedicalExam().getId()));
            existingRadiology.setMedicalExamination(medicalExam);
        }

        Radiology updatedRadiology = radiologyRepository.save(existingRadiology);

        return RadiologyDTO.builder()
                .id(updatedRadiology.getId())
                .imagePath(updatedRadiology.getImagePath())
                .conclusion(updatedRadiology.getConclusion())
                .clinicalService(convertDtoClinical(updatedRadiology))
                .medicalExam(convertDtoMedicalExam(updatedRadiology))
                .build();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!radiologyRepository.existsById(id)) {
            throw new BadActionException("Radiology not found with id: " + id);
        }
        radiologyRepository.deleteById(id);
    }


    @Override
    public RadiologyDTO getByMedicalExamId(Long id) {
       Radiology updatedRadiology = this.radiologyRepository.findByMedicalExamination_Id(id);
       if(updatedRadiology == null){
           throw new BadActionException("Radiology not found with medical examination ID: " + id);
       }
        return RadiologyDTO.builder()
                .id(updatedRadiology.getId())
                .imagePath(updatedRadiology.getImagePath())
                .conclusion(updatedRadiology.getConclusion())
                .clinicalService(convertDtoClinical(updatedRadiology))
                .medicalExam(convertDtoMedicalExam(updatedRadiology))
                .build();
    }
}
