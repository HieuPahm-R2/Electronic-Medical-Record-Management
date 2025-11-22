package group29.hust.service.impl;

import group29.hust.dtos.request.MedicalExamDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Department;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import group29.hust.repository.DepartmentRepository;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.service.IMedicalExamService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MedicalExamService implements IMedicalExamService {
    private final MedicalExamRepository medicalExamRepository;
    private final ModelMapper modelMapper;
    private final PatientRepository patientRepository;
    private final DepartmentRepository departmentRepository;
    
    @Override
    @Transactional
    public MedicalExamDTO insert(MedicalExamDTO dto) {
        MedicalExam medicalExam = modelMapper.map(dto, MedicalExam.class);
        MedicalExam savedMedicalExam = medicalExamRepository.save(medicalExam);
        return modelMapper.map(savedMedicalExam, MedicalExamDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public MedicalExamDTO getById(Long id) {
        MedicalExam medicalExam = medicalExamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Medical examination not found with id: " + id));
        return modelMapper.map(medicalExam, MedicalExamDTO.class);
    }

    @Override
    @Transactional
    public MedicalExamDTO update(MedicalExamDTO dto) throws BadActionException {
        if (dto.getId() == null) {
            throw new BadActionException("Medical examination ID cannot be null for update operation");
        }
        
        if (!medicalExamRepository.existsById(dto.getId())) {
            throw new EntityNotFoundException("Medical examination not found with id: " + dto.getId());
        }
        return modelMapper.map(medicalExamRepository.save(modelMapper.map(dto, MedicalExam.class)), MedicalExamDTO.class);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!medicalExamRepository.existsById(id)) {
            throw new EntityNotFoundException("Medical examination not found with id: " + id);
        }
        medicalExamRepository.deleteById(id);
    }

    @Override
    public MedicalExamDTO findMedicalExamWithPatientId(Long patientId) {
        MedicalExam medicalExam = medicalExamRepository.findMedicalExamByPatientId(patientId);
        if (medicalExam == null) {
            throw new BadActionException("Medical examination not found for patient with ID: " + patientId);
        }
        return modelMapper.map(medicalExam, MedicalExamDTO.class);
    }
}
