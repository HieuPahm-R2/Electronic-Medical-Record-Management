package group29.hust.service.impl;

import group29.hust.dtos.request.RadiologyDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.ClinicalService;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import group29.hust.model.Radiology;
import group29.hust.repository.ClinicalRepository;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.repository.RadiologyRepository;
import group29.hust.service.IRadiologyService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

    @Override
    @Transactional
    public RadiologyDTO insert(RadiologyDTO dto) {
        // Validate patient exists
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new BadActionException("Patient not found with id: " + dto.getPatientId()));

        Radiology radiology = modelMapper.map(dto, Radiology.class);
        radiology.setPatient(patient);

        // Handle clinical service association
        if (dto.getClinicalService() != null) {
            ClinicalService clinicalService = clinicalRepository.findById(dto.getClinicalService().getId())
                    .orElseThrow(() -> new BadActionException("Clinical service not found with id: " + 
                            dto.getClinicalService().getId()));
            radiology.setClinicalService(clinicalService);
        }

        // Handle medical exam association if provided
        if (dto.getMedicalExamId() != null) {
            MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExamId())
                    .orElseThrow(() -> new BadActionException("Medical exam not found with id: " + 
                            dto.getMedicalExamId()));
            radiology.setMedicalExamination(medicalExam);
        }

        Radiology savedRadiology = radiologyRepository.save(radiology);
        return modelMapper.map(savedRadiology, RadiologyDTO.class);
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

        // Update patient association if needed
        if (dto.getPatientId() != null &&
                (existingRadiology.getPatient() == null || !dto.getPatientId().equals(existingRadiology.getPatient().getId()))) {
            Patient patient = patientRepository.findById(dto.getPatientId())
                    .orElseThrow(() -> new BadActionException("Patient not found with id: " + dto.getPatientId()));
            existingRadiology.setPatient(patient);
        }

        // Update clinical service association if needed
        if (dto.getClinicalService() != null) {
            ClinicalService clinicalService = clinicalRepository.findById(dto.getClinicalService().getId())
                    .orElseThrow(() -> new BadActionException("Clinical service not found with id: " + 
                            dto.getClinicalService().getId()));
            existingRadiology.setClinicalService(clinicalService);
        }

        // Update medical exam association if needed
        if (dto.getMedicalExamId() != null) {
            MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExamId())
                    .orElseThrow(() -> new BadActionException("Medical exam not found with id: " + 
                            dto.getMedicalExamId()));
            existingRadiology.setMedicalExamination(medicalExam);
        }

        Radiology updatedRadiology = radiologyRepository.save(existingRadiology);
        return modelMapper.map(updatedRadiology, RadiologyDTO.class);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!radiologyRepository.existsById(id)) {
            throw new BadActionException("Radiology not found with id: " + id);
        }
        radiologyRepository.deleteById(id);
    }
    
    @Transactional(readOnly = true)
    public List<RadiologyDTO> getByPatientId(Long patientId) {
        return radiologyRepository.findByPatientId(patientId).stream()
                .map(radiology -> modelMapper.map(radiology, RadiologyDTO.class))
                .collect(Collectors.toList());
    }
}
