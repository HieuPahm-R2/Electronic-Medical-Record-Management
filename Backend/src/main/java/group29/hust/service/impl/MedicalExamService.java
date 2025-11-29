package group29.hust.service.impl;

import group29.hust.dtos.request.DepartmentDTO;
import group29.hust.dtos.request.MedicalExamDTO;
import group29.hust.dtos.request.PatientDTO;
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
        MedicalExam me = this.medicalExamRepository.findById(dto.getId()).orElseThrow(
                () -> new BadActionException("Medical examination not found with id: " + dto.getId()));
        me.setAlcoholMonths(dto.getAlcoholMonths());
        me.setArrivalTime(dto.getArrivalTime());
        me.setAllergyMonths(dto.getAllergyMonths());
        me.setDaysOfSymptoms(dto.getDaysOfSymptoms());
        me.setFamilyMedicalHistory(dto.getFamilyMedicalHistory());
        me.setHasAllergy(dto.isHasAllergy());
        me.setHasOther(dto.isHasOther());
        me.setOtherDescription(dto.getOtherDescription());
        me.setOtherMonths(dto.getOtherMonths());
        me.setPersonalMedicalHistory(dto.getPersonalMedicalHistory());
        me.setReceptionTime(dto.getReceptionTime());
        me.setReferralSource(dto.getReferralSource());
        me.setSymptoms(dto.getSymptoms());
        me.setReason(dto.getReason());
        me.setTobaccoMonths(dto.getTobaccoMonths());
        me.setUsesAlcohol(dto.isUsesAlcohol());
        me.setUsesDrugs(dto.isUsesDrugs());
        me.setDrugsMonths(dto.getDrugsMonths());
        me.setUsesTobacco(dto.isUsesTobacco());

        if(dto.getId() != null){
            Patient ps = this.patientRepository.findById(dto.getPatient()).orElseThrow(
                    () -> new BadActionException("Patient not found with id: " + dto.getId())
            );
            me.setPatient(ps);
        }
        if(dto.getDepartment().getId() != null){
            Department ds = this.departmentRepository.findById(dto.getDepartment().getId()).orElseThrow(
                    () -> new BadActionException("Department not found with id: " + dto.getDepartment().getId())
            );
            me.setDepartment(ds);
        }

        // Lưu entity đã được cập nhật
        MedicalExam savedMedicalExam = medicalExamRepository.save(me);

        DepartmentDTO dtd = DepartmentDTO.builder()
                .id(savedMedicalExam.getDepartment().getId())
                .name(savedMedicalExam.getDepartment().getName())
                .build();

        // Map trở lại thành DTO để trả về
        return MedicalExamDTO.builder()
                .id(savedMedicalExam.getId())
                .patient(savedMedicalExam.getPatient().getId())
                .alcoholMonths(savedMedicalExam.getAlcoholMonths())
                .arrivalTime(savedMedicalExam.getArrivalTime())
                .allergyMonths(savedMedicalExam.getAllergyMonths())
                .daysOfSymptoms(savedMedicalExam.getDaysOfSymptoms())
                .department(dtd)
                .drugsMonths(savedMedicalExam.getDrugsMonths())
                .familyMedicalHistory(savedMedicalExam.getFamilyMedicalHistory())
                .reason(savedMedicalExam.getReason())
                .hasAllergy(savedMedicalExam.isHasAllergy())
                .hasOther(savedMedicalExam.isHasOther())
                .otherDescription(savedMedicalExam.getOtherDescription())
                .otherMonths(savedMedicalExam.getOtherMonths())
                .personalMedicalHistory(savedMedicalExam.getPersonalMedicalHistory())
                .receptionTime(savedMedicalExam.getReceptionTime())
                .referralSource(savedMedicalExam.getReferralSource())
                .symptoms(savedMedicalExam.getSymptoms())
                .tobaccoMonths(savedMedicalExam.getTobaccoMonths())
                .usesAlcohol(savedMedicalExam.isUsesAlcohol())
                .usesDrugs(savedMedicalExam.isUsesDrugs())
                .usesTobacco(savedMedicalExam.isUsesTobacco())
                .build();

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
        var department = medicalExam.getDepartment();
        DepartmentDTO dtm = DepartmentDTO.builder()
                .id(department != null ? department.getId() : null)     // Nếu dept null thì id = null
                .name(department != null ? department.getName() : "")
                .build();
        return MedicalExamDTO.builder()
                .id(medicalExam.getId())
                .patient(medicalExam.getPatient().getId())
                .alcoholMonths(medicalExam.getAlcoholMonths())
                .arrivalTime(medicalExam.getArrivalTime())
                .allergyMonths(medicalExam.getAllergyMonths())
                .daysOfSymptoms(medicalExam.getDaysOfSymptoms())
                .department(dtm)
                .drugsMonths(medicalExam.getDrugsMonths())
                .familyMedicalHistory(medicalExam.getFamilyMedicalHistory())
                .reason(medicalExam.getReason())
                .hasAllergy(medicalExam.isHasAllergy())
                .hasOther(medicalExam.isHasOther())
                .otherDescription(medicalExam.getOtherDescription())
                .otherMonths(medicalExam.getOtherMonths())
                .personalMedicalHistory(medicalExam.getPersonalMedicalHistory())
                .receptionTime(medicalExam.getReceptionTime())
                .referralSource(medicalExam.getReferralSource())
                .symptoms(medicalExam.getSymptoms())
                .tobaccoMonths(medicalExam.getTobaccoMonths())
                .usesAlcohol(medicalExam.isUsesAlcohol())
                .usesDrugs(medicalExam.isUsesDrugs())
                .usesTobacco(medicalExam.isUsesTobacco())
                .build();
    }
}
