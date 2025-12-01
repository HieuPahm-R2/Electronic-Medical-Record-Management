package group29.hust.service.impl;

import com.turkraft.springfilter.builder.FilterBuilder;
import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.converter.FilterSpecificationConverter;
import com.turkraft.springfilter.parser.FilterParser;
import com.turkraft.springfilter.parser.node.FilterNode;
import group29.hust.dtos.request.DepartmentDTO;
import group29.hust.dtos.request.MedicalExamDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.*;
import group29.hust.repository.*;
import group29.hust.service.IMedicalExamService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalExamService implements IMedicalExamService {

    @Autowired
    FilterBuilder fb;
    @Autowired
    private FilterParser filterParser;
    @Autowired
    private FilterSpecificationConverter filterSpecificationConverter;
    private final MedicalExamRepository medicalExamRepository;
    private final ModelMapper modelMapper;
    private final PatientRepository patientRepository;
    private final DepartmentRepository departmentRepository;
    private final RadiologyRepository radiologyRepository;
    private final ClinicalInfoRepository clinicalInfoRepository;
    private final VitalSignRepository vitalSignRepository;
    private final BloodTestRepository bloodTestRepository;
    private final DiagnoseFinalRepository diagnoseFinalRepository;
    
    @Override
    @Transactional
    public MedicalExamDTO insert(MedicalExamDTO dto) {
        MedicalExam savedMedicalExam = new MedicalExam();
        if(dto.getPatient() != null){
            Patient ps = this.patientRepository.findById(dto.getPatient()).orElseThrow(
                    () -> new BadActionException("Patient not found with id: " + dto.getId())
            );
            savedMedicalExam.setPatient(ps);
        }
        savedMedicalExam.setArrivalTime(LocalDateTime.now());
        savedMedicalExam.setReceptionTime(LocalDateTime.now());
        medicalExamRepository.save(savedMedicalExam);

        VitalSign vt = new VitalSign();
        Radiology rg = new Radiology();
        ClinicalInfo clinicalInfo = new ClinicalInfo();
        BloodTest bt = new BloodTest();
        DiagnoseFinal dg = new DiagnoseFinal();
        // set value vital sign
        vt.setMedicalExamination(savedMedicalExam);
        vitalSignRepository.save(vt);
        // set value blood test
        bt.setMedicalExamination(savedMedicalExam);
        bloodTestRepository.save(bt);

        // set value radiology
        rg.setMedicalExamination(savedMedicalExam);
        radiologyRepository.save(rg);
        // set value clinical info
        clinicalInfo.setMedicalExam(savedMedicalExam);
        clinicalInfoRepository.save(clinicalInfo);
        // set value diagnose final
        dg.setMedicalExamination(savedMedicalExam);
        diagnoseFinalRepository.save(dg);
        return MedicalExamDTO.builder()
                .id(savedMedicalExam.getId())
                .arrivalTime(savedMedicalExam.getArrivalTime())
                .receptionTime(savedMedicalExam.getReceptionTime())
                .patient(savedMedicalExam.getPatient().getId())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public MedicalExamDTO getById(Long id) {
        MedicalExam medicalExam = medicalExamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Medical examination not found with id: " + id));
        DepartmentDTO departmentDTO = DepartmentDTO.builder()
                .id(medicalExam.getDepartment().getId())
                .name(medicalExam.getDepartment().getName())
                .build();
        return MedicalExamDTO.builder()
                .id(medicalExam.getId())
                .patient(medicalExam.getPatient().getId())
                .alcoholMonths(medicalExam.getAlcoholMonths())
                .arrivalTime(medicalExam.getArrivalTime())
                .allergyMonths(medicalExam.getAllergyMonths())
                .daysOfSymptoms(medicalExam.getDaysOfSymptoms())
                .familyMedicalHistory(medicalExam.getFamilyMedicalHistory())
                .hasAllergy(medicalExam.isHasAllergy())
                .hasOther(medicalExam.isHasOther())
                .otherDescription(medicalExam.getOtherDescription())
                .otherMonths(medicalExam.getOtherMonths())
                .personalMedicalHistory(medicalExam.getPersonalMedicalHistory())
                .receptionTime(medicalExam.getReceptionTime())
                .referralSource(medicalExam.getReferralSource())
                .symptoms(medicalExam.getSymptoms())
                .reason(medicalExam.getReason())
                .tobaccoMonths(medicalExam.getTobaccoMonths())
                .usesAlcohol(medicalExam.isUsesAlcohol())
                .usesDrugs(medicalExam.isUsesDrugs())
                .drugsMonths(medicalExam.getDrugsMonths())
                .usesTobacco(medicalExam.isUsesTobacco())
                .department(departmentDTO)
                .build();
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
    public PaginationResultDTO findMedicalExamWithPatientId(Long patientId, Pageable pageable) {

        // Create a filter for medicalExam.id property
        FilterNode node = filterParser.parse("patient.id=" + patientId);
        FilterSpecification<MedicalExam> spec = filterSpecificationConverter.convert(node);
        // Apply the filter and pagination
        Page<MedicalExam> pageResult = medicalExamRepository.findAll(spec, pageable);

        // Map to DTOs
        List<MedicalExamDTO> content = pageResult.getContent().stream()
                .map(data -> {
                    var department = data.getDepartment();
                    DepartmentDTO dtm = DepartmentDTO.builder()
                            .id(department != null ? department.getId() : null)
                            .name(department != null ? department.getName() : "")
                            .build();
                    return MedicalExamDTO.builder()
                            .id(data.getId())
                            .patient(data.getPatient().getId())
                            .arrivalTime(data.getArrivalTime())
                            .receptionTime(data.getReceptionTime())
                            .department(dtm)
                            .usesAlcohol(data.isUsesAlcohol())
                            .usesDrugs(data.isUsesDrugs())
                            .usesTobacco(data.isUsesTobacco())
                            .tobaccoMonths(data.getTobaccoMonths())
                            .alcoholMonths(data.getAlcoholMonths())
                            .allergyMonths(data.getAllergyMonths())
                            .daysOfSymptoms(data.getDaysOfSymptoms())
                            .familyMedicalHistory(data.getFamilyMedicalHistory())
                            .reason(data.getReason())
                            .hasAllergy(data.isHasAllergy())
                            .hasOther(data.isHasOther())
                            .otherDescription(data.getOtherDescription())
                            .otherMonths(data.getOtherMonths())
                            .personalMedicalHistory(data.getPersonalMedicalHistory())
                            .symptoms(data.getSymptoms())
                            .referralSource(data.getReferralSource())
                            .build();
                })
                .collect(Collectors.toList());

        // Set up pagination result
        PaginationResultDTO result = new PaginationResultDTO();
        PaginationResultDTO.Meta meta = new PaginationResultDTO.Meta();
        meta.setPage(pageResult.getNumber() + 1);
        meta.setPageSize(pageResult.getSize());
        meta.setTotal(pageResult.getTotalElements());
        meta.setPages(pageResult.getTotalPages());

        result.setMeta(meta);
        result.setResult(content);

        return result;
    }
}
