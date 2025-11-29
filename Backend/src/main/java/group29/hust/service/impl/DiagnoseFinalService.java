package group29.hust.service.impl;

import group29.hust.dtos.request.DiagnoseFinalDTO;
import group29.hust.dtos.response.MedicalExamRes;
import group29.hust.exception.BadActionException;
import group29.hust.model.DiagnoseFinal;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import group29.hust.model.Radiology;
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

    private MedicalExamRes convertDtoMedicalExam(DiagnoseFinal data){
        return MedicalExamRes.builder()
                .id(data.getId())
                .build();
    }

    @Override
    @Transactional
    public DiagnoseFinalDTO insert(DiagnoseFinalDTO dto) {

        DiagnoseFinal dg = modelMapper.map(dto, DiagnoseFinal.class);
        if (dto.getMedicalExam() != null) {
            MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExam().getId())
                    .orElseThrow(() -> new BadActionException("Medical examination not found with id: "));
            dg.setMedicalExamination(medicalExam);
        }
        
        // Save entity
        DiagnoseFinal savedDiagnoseFinal = this.diagnoseFinalRepository.save(dg);
        
        return DiagnoseFinalDTO.builder()
                .comorbidity(savedDiagnoseFinal.getComorbidity())
                .conclusion(savedDiagnoseFinal.getConclusion())
                .mainDisease(savedDiagnoseFinal.getMainDisease())
                .prognosis(savedDiagnoseFinal.getPrognosis())
                .treatmentPlan(savedDiagnoseFinal.getTreatmentPlan())
                .id(savedDiagnoseFinal.getId())
                .medicalExam(convertDtoMedicalExam(savedDiagnoseFinal) )
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public DiagnoseFinalDTO getById(Long id) {
        DiagnoseFinal savedDiagnoseFinal = diagnoseFinalRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Diagnose final not found with id: " + id));
        
        return DiagnoseFinalDTO.builder()
                .comorbidity(savedDiagnoseFinal.getComorbidity())
                .conclusion(savedDiagnoseFinal.getConclusion())
                .mainDisease(savedDiagnoseFinal.getMainDisease())

                .prognosis(savedDiagnoseFinal.getPrognosis())
                .treatmentPlan(savedDiagnoseFinal.getTreatmentPlan())
                .id(savedDiagnoseFinal.getId())
                .medicalExam(convertDtoMedicalExam(savedDiagnoseFinal) )
                .build();
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
        
        // Update medical exam if needed
        if (dto.getMedicalExam() != null &&
            (existingDiagnoseFinal.getMedicalExamination() == null || 
             !dto.getMedicalExam().getId().equals(existingDiagnoseFinal.getMedicalExamination().getId()))) {
            MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExam().getId())
                    .orElseThrow(() -> new BadActionException("Medical examination not found with id: "));
            existingDiagnoseFinal.setMedicalExamination(medicalExam);
        }
        
        // Save an updated entity
        DiagnoseFinal savedDiagnoseFinal = diagnoseFinalRepository.save(existingDiagnoseFinal);
        
        return DiagnoseFinalDTO.builder()
                .comorbidity(savedDiagnoseFinal.getComorbidity())
                .conclusion(savedDiagnoseFinal.getConclusion())
                .mainDisease(savedDiagnoseFinal.getMainDisease())
                .prognosis(savedDiagnoseFinal.getPrognosis())
                .treatmentPlan(savedDiagnoseFinal.getTreatmentPlan())
                .id(savedDiagnoseFinal.getId())
                .medicalExam(convertDtoMedicalExam(savedDiagnoseFinal) )
                .build();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!diagnoseFinalRepository.existsById(id)) {
            throw new BadActionException("Diagnose final not found with id: " + id);
        }
        diagnoseFinalRepository.deleteById(id);
    }


    @Override
    public DiagnoseFinalDTO findDiagnoseFinalWithMedicalExamId(Long medicalExamId) {
        DiagnoseFinal df = this.diagnoseFinalRepository.findDiagnoseFinalByMedicalExaminationId(medicalExamId);
        if(df == null){
            throw new BadActionException("Diagnose final not found for medical examination with ID: " + medicalExamId);
        }
        return DiagnoseFinalDTO.builder()
                .comorbidity(df.getComorbidity())
                .conclusion(df.getConclusion())
                .mainDisease(df.getMainDisease())
                .prognosis(df.getPrognosis())
                .treatmentPlan(df.getTreatmentPlan())
                .id(df.getId())
                .medicalExam(convertDtoMedicalExam(df))
                .build();
    }
}
