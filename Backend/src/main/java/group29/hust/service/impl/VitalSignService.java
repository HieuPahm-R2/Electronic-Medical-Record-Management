package group29.hust.service.impl;

import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.parser.node.FilterNode;
import group29.hust.dtos.request.RadiologyDTO;
import group29.hust.dtos.request.VitalSignDTO;
import group29.hust.dtos.response.MedicalExamRes;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import group29.hust.model.Radiology;
import group29.hust.model.VitalSign;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.repository.VitalSignRepository;
import group29.hust.service.IVitalSignService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

        MedicalExam medicalExam = medicalExamRepository.findById(dto.getMedicalExam().getId())
                .orElseThrow(() -> new BadActionException("Medical examination not found with ID: " + dto.getMedicalExam()));
        vitalSign.setMedicalExamination(medicalExam);
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
        
        return dto;
    }

    @Override
    @Transactional
    public VitalSignDTO update(VitalSignDTO dto) throws BadActionException {
        // Check if exists
        VitalSign vitalSign = vitalSignRepository.findById(dto.getId())
                .orElseThrow(() -> new BadActionException("Vital sign not found with ID: " + dto.getId()));

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
                .id(updatedVitalSign.getMedicalExamination().getId())
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
    public VitalSignDTO findVitalSignWithMedicalExamId(Long id) {
        VitalSign updatedVitalSign = this.vitalSignRepository.findByMedicalExamination_Id(id);
        if(updatedVitalSign == null){
            throw new BadActionException("Vital sign not found with medical examination ID: " + id);
        }
        MedicalExamRes mes = MedicalExamRes.builder()
                .id(updatedVitalSign.getMedicalExamination().getId())
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
                .pulseRate(updatedVitalSign.getPulseRate())
                .systolicBp(updatedVitalSign.getSystolicBp())
                .respiratoryRate(updatedVitalSign.getRespiratoryRate())
                .medicalExam(mes)
                .build();
    }
}
