package group29.hust.service.impl;

import group29.hust.dtos.request.ClinicalInfoDTO;
import group29.hust.dtos.request.ClinicalServiceDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.ClinicalInfo;
import group29.hust.model.ClinicalService;
import group29.hust.model.Permission;
import group29.hust.repository.ClinicalInfoRepository;
import group29.hust.repository.ClinicalRepository;
import group29.hust.repository.MedicalExamRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.service.IClinicalInfoService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClinicalInfoService implements IClinicalInfoService {

    private final ModelMapper modelMapper;
    private final ClinicalInfoRepository clinicalInfoRepository;
    private final PatientRepository patientRepository;
    private final ClinicalRepository clinicalRepository;
    private final MedicalExamRepository medicalExamRepository;

    @Override
    @Transactional
    public ClinicalInfoDTO insert(ClinicalInfoDTO dto) throws BadActionException {
        // Validate patient exists
        ClinicalInfo film = modelMapper.map(dto, ClinicalInfo.class);
        
        // Validate clinical service exists
        if (dto.getClinicalServices() != null) {
            Set<Long> reqCate = dto.getClinicalServices().stream().map(ClinicalServiceDTO::getId)
                    .collect(Collectors.toSet());
            Set<ClinicalService> mainCategory = this.clinicalRepository.findByIdIn(reqCate);
            film.setClinicalServices(mainCategory);
        }

        if(dto.getMedicalExam() != null){
            film.setMedicalExam(medicalExamRepository.findById(dto.getMedicalExam())
            .orElseThrow(() -> new BadActionException("Medical examination not found with ID: ")));
        }
        
        return modelMapper.map(clinicalInfoRepository.save(film), ClinicalInfoDTO.class);
    }

    @Override
    public ClinicalInfoDTO getById(Long id) {
        return modelMapper.map(clinicalInfoRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Clinical information not found with ID: " + id)), ClinicalInfoDTO.class);
    }

    @Override
    @Transactional
    public ClinicalInfoDTO update(ClinicalInfoDTO dto) throws BadActionException {
        // Check if the clinical info exists
        ClinicalInfo clinicalInfo = clinicalInfoRepository.findById(dto.getId())
                .orElseThrow(() -> new BadActionException("Clinical information not found with ID: " + dto.getId()));
        if(dto.getMedicalExam() != null){
            clinicalInfo.setMedicalExam(medicalExamRepository.findById(dto.getMedicalExam())
            .orElseThrow(() -> new BadActionException("Medical examination not found with ID: ")));
        }
        Set<Long> services = dto.getClinicalServices().stream().map(ClinicalServiceDTO::getId).collect(Collectors.toSet());
        Set<ClinicalService> ss = this.clinicalRepository.findByIdIn(services);
        clinicalInfo.setClinicalServices(ss);
        clinicalInfo.setBoneDiagnosis(dto.getBoneDiagnosis());
        clinicalInfo.setEntDiagnosis(dto.getEntDiagnosis());
        clinicalInfo.setDigestiveDiagnosis(dto.getDigestiveDiagnosis());
        clinicalInfo.setSyndrome(dto.getSyndrome());
        clinicalInfo.setCirculatoryDiagnosis(dto.getCirculatoryDiagnosis());
        clinicalInfo.setGenitourinaryDiagnosis(dto.getGenitourinaryDiagnosis());
        clinicalInfo.setOtherDiagnoses(dto.getOtherDiagnoses());
        clinicalInfo.setNervousDiagnosis(dto.getNervousDiagnosis());
        ClinicalInfo cs = clinicalInfoRepository.save(clinicalInfo);

        Set<ClinicalServiceDTO> re = cs.getClinicalServices().stream().map(
                item -> {
                    ClinicalServiceDTO csdto = new ClinicalServiceDTO();
                    csdto.setId(item.getId());
                    csdto.setServiceName(item.getServiceName());
                    return csdto;
                }
        ).collect(Collectors.toSet());
        return ClinicalInfoDTO.builder()
                .clinicalServices(re)
                .id(cs.getId())
                .boneDiagnosis(cs.getBoneDiagnosis())
                .entDiagnosis(cs.getEntDiagnosis())
                .digestiveDiagnosis(cs.getDigestiveDiagnosis())
                .syndrome(cs.getSyndrome())
                .circulatoryDiagnosis(cs.getCirculatoryDiagnosis())
                .genitourinaryDiagnosis(cs.getGenitourinaryDiagnosis())
                .nervousDiagnosis(cs.getNervousDiagnosis())
                .medicalExam(cs.getMedicalExam().getId())
                .otherDiagnoses(cs.getOtherDiagnoses())
                .respiratoryDiagnosis(cs.getRespiratoryDiagnosis())
                .build();

    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!clinicalInfoRepository.existsById(id)) {
            throw new BadActionException("Clinical information not found with ID: " + id);
        }
        clinicalInfoRepository.deleteById(id);
    }

    @Override
    public ClinicalInfoDTO findClinicalInfoWithMedicalExamId(Long medicalExamId) {
        ClinicalInfo clinicalInfo = clinicalInfoRepository.findClinicalInfoByMedicalExamId(medicalExamId);
        if (clinicalInfo == null) {
            throw new BadActionException("Clinical information not found for medical exam with ID: " + medicalExamId);
        }
        Set<ClinicalServiceDTO> re = clinicalInfo.getClinicalServices().stream().map(
                item -> {
                    ClinicalServiceDTO csdto = new ClinicalServiceDTO();
                    csdto.setId(item.getId());
                    csdto.setServiceName(item.getServiceName());
                    return csdto;
                }
        ).collect(Collectors.toSet());
        return ClinicalInfoDTO.builder()
                .respiratoryDiagnosis(clinicalInfo.getRespiratoryDiagnosis())
                .clinicalServices(re)
                .id(clinicalInfo.getId())
                .medicalExam(clinicalInfo.getMedicalExam().getId())
                .nervousDiagnosis(clinicalInfo.getNervousDiagnosis())
                .otherDiagnoses(clinicalInfo.getOtherDiagnoses())
                .boneDiagnosis(clinicalInfo.getBoneDiagnosis())
                .circulatoryDiagnosis(clinicalInfo.getCirculatoryDiagnosis())
                .digestiveDiagnosis(clinicalInfo.getDigestiveDiagnosis())
                .genitourinaryDiagnosis(clinicalInfo.getGenitourinaryDiagnosis())
                .syndrome(clinicalInfo.getSyndrome())
                .entDiagnosis(clinicalInfo.getEntDiagnosis())
                .build();
    }

    @Override
    public PaginationResultDTO getAll(Specification<ClinicalService> spec, Pageable pageable) {
        Page<ClinicalService> page = this.clinicalRepository.findAll(spec, pageable);
        PaginationResultDTO rs = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();

        mt.setPage(page.getNumber() + 1);
        mt.setPageSize(page.getSize());
        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(page.getContent());
        return rs;
    }
}
