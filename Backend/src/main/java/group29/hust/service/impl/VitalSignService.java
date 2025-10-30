package group29.hust.service.impl;

import group29.hust.dtos.request.VitalSignDTO;
import group29.hust.exception.BadActionException;
import group29.hust.exception.NotFoundException;
import group29.hust.model.Patient;
import group29.hust.model.VitalSign;
import group29.hust.repository.PatientRepository;
import group29.hust.repository.VitalSignRepository;
import group29.hust.service.IVitalSignService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VitalSignService implements IVitalSignService {

    private final ModelMapper modelMapper;
    private final VitalSignRepository vitalSignRepository;
    private final PatientRepository patientRepository;

    @Override
    @Transactional
    public VitalSignDTO insert(VitalSignDTO dto) {
        VitalSign vitalSign = modelMapper.map(dto, VitalSign.class);
        
        // Set patient relationship
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new BadActionException("Patient not found with ID: " + dto.getPatientId()));
        vitalSign.setPatient(patient);
        
        // Save the entity
        VitalSign savedVitalSign = vitalSignRepository.save(vitalSign);
        
        return modelMapper.map(savedVitalSign, VitalSignDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public VitalSignDTO getById(Long id) {
        VitalSign vitalSign = vitalSignRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Vital sign not found with ID: " + id));
        
        VitalSignDTO dto = modelMapper.map(vitalSign, VitalSignDTO.class);
        dto.setPatientId(vitalSign.getPatient().getId());
        
        return dto;
    }

    @Override
    @Transactional
    public VitalSignDTO update(VitalSignDTO dto) throws BadActionException {
        // Check if exists
        VitalSign vitalSign = vitalSignRepository.findById(dto.getId())
                .orElseThrow(() -> new BadActionException("Vital sign not found with ID: " + dto.getId()));
        
        // Update fields from DTO
        modelMapper.map(dto, vitalSign);
        
        // Update patient relationship if it changed
        if (dto.getPatientId() != null && 
            (vitalSign.getPatient() == null || !vitalSign.getPatient().getId().equals(dto.getPatientId()))) {
            Patient patient = patientRepository.findById(dto.getPatientId())
                    .orElseThrow(() -> new BadActionException("Patient not found with ID: " + dto.getPatientId()));
            vitalSign.setPatient(patient);
        }
        VitalSign updatedVitalSign = vitalSignRepository.save(vitalSign);
        
        return modelMapper.map(updatedVitalSign, VitalSignDTO.class);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!vitalSignRepository.existsById(id)) {
            throw new BadActionException("Vital sign not found with ID: " + id);
        }
        
        vitalSignRepository.deleteById(id);
    }
}
