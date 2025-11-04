package group29.hust.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import group29.hust.model.ClinicalService;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RadiologyDTO {
    private Long id;

    private String imagePath;

    private String conclusion;

    @JsonProperty("patient_id")
    private Long patientId;

    @JsonProperty("clinical_service_id")
    private ClinicalServiceDTO clinicalService;

    @JsonProperty("medical_exam_id")
    private Long medicalExamId;
}
