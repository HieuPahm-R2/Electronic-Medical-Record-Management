package group29.hust.service.impl;

import group29.hust.dtos.request.DiagnoseFinalDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.DiagnoseFinal;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import group29.hust.repository.DiagnoseFinalRepository;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.service.IDiagnoseFinalService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DiagnoseFinalService implements IDiagnoseFinalService {
    private final DiagnoseFinalRepository diagnoseFinalRepository;
    private final PatientRepository patientRepository;
    private final MedicalExamRepository medicalExamRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public DiagnoseFinalDTO insert(DiagnoseFinalDTO dto) {
        // Get Patient and MedicalExam entities
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new BadActionException("Patient not found with id: " + dto.getPatientId()));
        
        MedicalExam medicalExam = null;
        if (dto.getMedicalExamId() != null) {
            medicalExam = medicalExamRepository.findById(dto.getMedicalExamId())
                    .orElseThrow(() -> new BadActionException("Medical examination not found with id: " + dto.getMedicalExamId()));
        }
        DiagnoseFinal diagnoseFinal = new DiagnoseFinal();
        diagnoseFinal.setMainDisease(dto.getMainDisease());
        diagnoseFinal.setComorbidity(dto.getComorbidity());
        diagnoseFinal.setConclusion(dto.getConclusion());
        diagnoseFinal.setPrognosis(dto.getPrognosis());
        diagnoseFinal.setTreatmentPlan(dto.getTreatmentPlan());
        diagnoseFinal.setPatient(patient);
        diagnoseFinal.setMedicalExamination(medicalExam);
        
        // Save entity
        DiagnoseFinal savedDiagnoseFinal = diagnoseFinalRepository.save(diagnoseFinal);
        
        // Map entity back to DTO
        DiagnoseFinalDTO resultDto = modelMapper.map(savedDiagnoseFinal, DiagnoseFinalDTO.class);
        resultDto.setPatientId(savedDiagnoseFinal.getPatient().getId());
        if (savedDiagnoseFinal.getMedicalExamination() != null) {
            resultDto.setMedicalExamId(savedDiagnoseFinal.getMedicalExamination().getId());
        }
        
        return resultDto;
    }

    @Override
    @Transactional(readOnly = true)
    public DiagnoseFinalDTO getById(Long id) {
        DiagnoseFinal diagnoseFinal = diagnoseFinalRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Diagnose final not found with id: " + id));
        
        DiagnoseFinalDTO dto = modelMapper.map(diagnoseFinal, DiagnoseFinalDTO.class);
        dto.setPatientId(diagnoseFinal.getPatient().getId());
        if (diagnoseFinal.getMedicalExamination() != null) {
            dto.setMedicalExamId(diagnoseFinal.getMedicalExamination().getId());
        }
        
        return dto;
    }

    @Override
    @Transactional
    public DiagnoseFinalDTO update(DiagnoseFinalDTO dto) throws BadActionException {
        if (dto.getId() == null) {
            throw new BadActionException("Diagnose final ID cannot be null for update operation");
        }
        
        DiagnoseFinal existingDiagnoseFinal = diagnoseFinalRepository.findById(dto.getId())
                .orElseThrow(() -> new BadActionException("Diagnose final not found with id: " + dto.getId()));
        
        // Update fields
        existingDiagnoseFinal.setMainDisease(dto.getMainDisease());
        existingDiagnoseFinal.setComorbidity(dto.getComorbidity());
        existingDiagnoseFinal.setConclusion(dto.getConclusion());
        existingDiagnoseFinal.setPrognosis(dto.getPrognosis());
        existingDiagnoseFinal.setTreatmentPlan(dto.getTreatmentPlan());
        
        // Update patient if needed
        if (dto.getPatientId() != null && 
            (existingDiagnoseFinal.getPatient() == null || !dto.getPatientId().equals(existingDiagnoseFinal.getPatient().getId()))) {
            Patient patient = patientRepository.findById(dto.getPatientId())
                    .orElseThrow(() -> new BadActionException("Patient not found with id: " + dto.getPatientId()));
            existingDiagnoseFinal.setPatient(patient);
        }
        
        // Update medical exam if needed
        if (dto.getMedicalExamId() != null &&
            (existingDiagnoseFinal.getMedicalExamination() == null || 
             !dto.getMedicalExamId().equals(existingDiagnoseFinal.getMedicalExamination().getId()))) {
            MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExamId())
                    .orElseThrow(() -> new BadActionException("Medical examination not found with id: " + dto.getMedicalExamId()));
            existingDiagnoseFinal.setMedicalExamination(medicalExam);
        }
        
        // Save an updated entity
        DiagnoseFinal updatedDiagnoseFinal = diagnoseFinalRepository.save(existingDiagnoseFinal);
        
        // Map entity back to DTO
        DiagnoseFinalDTO resultDto = modelMapper.map(updatedDiagnoseFinal, DiagnoseFinalDTO.class);
        resultDto.setPatientId(updatedDiagnoseFinal.getPatient().getId());
        if (updatedDiagnoseFinal.getMedicalExamination() != null) {
            resultDto.setMedicalExamId(updatedDiagnoseFinal.getMedicalExamination().getId());
        }
        
        return resultDto;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!diagnoseFinalRepository.existsById(id)) {
            throw new BadActionException("Diagnose final not found with id: " + id);
        }
        diagnoseFinalRepository.deleteById(id);
    }
}
