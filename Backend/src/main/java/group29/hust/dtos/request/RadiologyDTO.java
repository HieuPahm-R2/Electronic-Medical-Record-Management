package group29.hust.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import group29.hust.dtos.response.MedicalExamRes;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RadiologyDTO {
    private Long id;

    @JsonProperty("image_path")
    private String imagePath;

    private String conclusion;

    @JsonProperty("patient_id")
    private Long patientId;

    @JsonProperty("clinical_service_id")
    private ClinicalServiceDTO clinicalService;

    @JsonProperty("medical_exam_id")
    private MedicalExamRes medicalExam;
}
