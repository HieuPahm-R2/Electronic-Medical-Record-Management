package group29.hust.dtos.request;
import com.fasterxml.jackson.annotation.JsonProperty;
import group29.hust.model.ClinicalService;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalInfoDTO {
    private Long id;

    @NotNull(message = "Patient ID is required")
    @JsonProperty("patient_id")
    private Long patientId;

    @JsonProperty("medical_exam_id")
    private Long medicalExamId;

    @JsonProperty("clinical_services")
    private Set<ClinicalServiceDTO> clinicalServices;

    @JsonProperty("circulatory_diagnosis")
    private String circulatoryDiagnosis;

    @JsonProperty("respiratory_diagnosis")
    private String respiratoryDiagnosis;

    @JsonProperty("genitourinary_diagnosis")
    private String genitourinaryDiagnosis;

    @NotNull(message = "Bone diagnosis is required")
    @JsonProperty("bone_diagnosis")
    private String boneDiagnosis;

    @NotNull(message = "RHM diagnosis is required")
    @JsonProperty("rhm_diagnosis")
    private String rhmDiagnosis;

    @JsonProperty("digestive_diagnosis")
    private String digestiveDiagnosis;

    @JsonProperty("nervous_diagnosis")
    private String nervousDiagnosis;

   @JsonProperty("ent_diagnosis")
    @Size(min = 1, message = "ENT diagnosis cannot be empty")
    private String entDiagnosis;

    @JsonProperty("other_diagnoses")
    private String otherDiagnoses;

    // 'syndrome' là nullable nên không cần @NotNull
    private String syndrome;
}
