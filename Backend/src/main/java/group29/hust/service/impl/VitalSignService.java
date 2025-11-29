package group29.hust.service.impl;

import group29.hust.dtos.request.VitalSignDTO;
import group29.hust.dtos.response.MedicalExamRes;
import group29.hust.exception.BadActionException;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import group29.hust.model.VitalSign;
import group29.hust.repository.MedicalExamRepository;
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
    private final MedicalExamRepository medicalExamRepository;

    @Override
    @Transactional
    public VitalSignDTO insert(VitalSignDTO dto) {
        VitalSign vitalSign = modelMapper.map(dto, VitalSign.class);
        // Set patient relationship
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new BadActionException("Patient not found with ID: " + dto.getPatientId()));
        vitalSign.setPatient(patient);

        MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExam().getId())
                .orElseThrow(() -> new BadActionException("Medical examination not found with ID: " + dto.getMedicalExam()));
        vitalSign.setMedicalExam(medicalExam);
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

        if (dto.getPatientId() != null && 
            (vitalSign.getPatient() == null || !vitalSign.getPatient().getId().equals(dto.getPatientId()))) {
            Patient patient = patientRepository.findById(dto.getPatientId())
                    .orElseThrow(() -> new BadActionException("Patient not found with ID: " + dto.getPatientId()));
            vitalSign.setPatient(patient);
        }
        vitalSign.setBloodGroup(dto.getBloodGroup());
        vitalSign.setBloodType(dto.getBloodType());
        vitalSign.setHeight(dto.getHeight());
        vitalSign.setWeight(dto.getWeight());
        vitalSign.setDiastolicBp(dto.getDiastolicBp());
        vitalSign.setHeartRate(dto.getHeartRate());
        vitalSign.setTemperature(dto.getTemperature());
        vitalSign.setNotes(dto.getNotes());
        vitalSign.setPulseRate(dto.getPulseRate());
        vitalSign.setRespiratoryRate(dto.getRespiratoryRate());
        vitalSign.setSystolicBp(dto.getSystolicBp());
        VitalSign updatedVitalSign = vitalSignRepository.save(vitalSign);
        MedicalExamRes mes = MedicalExamRes.builder()
                .id(updatedVitalSign.getMedicalExam().getId())
                .patientId(updatedVitalSign.getPatient().getId())
                .build();

        return VitalSignDTO.builder()
                .id(updatedVitalSign.getId())
                .bloodGroup(updatedVitalSign.getBloodGroup())
                .bloodType(updatedVitalSign.getBloodType())
                .height(updatedVitalSign.getHeight())
                .weight(updatedVitalSign.getWeight())
                .diastolicBp(updatedVitalSign.getDiastolicBp())
                .heartRate(updatedVitalSign.getHeartRate())
                .temperature(updatedVitalSign.getTemperature())
                .notes(updatedVitalSign.getNotes())
                .patientId(updatedVitalSign.getPatient().getId())
                .pulseRate(updatedVitalSign.getPulseRate())
                .systolicBp(updatedVitalSign.getSystolicBp())
                .respiratoryRate(updatedVitalSign.getRespiratoryRate())
                .medicalExam(mes)
                .build();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!vitalSignRepository.existsById(id)) {
            throw new BadActionException("Vital sign not found with ID: " + id);
        }
        vitalSignRepository.deleteById(id);
    }
    @Override
    public VitalSignDTO findVitalSignWithPatientId(Long patientId) {
        VitalSign vitalSign = vitalSignRepository.findVitalSignByPatientId(patientId);
        if (vitalSign == null) {
            throw new BadActionException("Vital sign not found for patient with ID: " + patientId);
        }
        return modelMapper.map(vitalSign, VitalSignDTO.class);
    }
}
