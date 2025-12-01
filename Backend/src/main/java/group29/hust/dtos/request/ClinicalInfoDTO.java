package group29.hust.dtos.request;
import com.fasterxml.jackson.annotation.JsonProperty;
import group29.hust.model.ClinicalService;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClinicalInfoDTO {
    private Long id;

    @JsonProperty("medical_exam_id")
    private Long medicalExam;

    @JsonProperty("clinical_services")
    private Set<ClinicalServiceDTO> clinicalServices;

    @JsonProperty("circulatory_diagnosis")
    private String circulatoryDiagnosis;

    @JsonProperty("respiratory_diagnosis")
    private String respiratoryDiagnosis;

    @JsonProperty("genitourinary_diagnosis")
    private String genitourinaryDiagnosis;

    @JsonProperty("bone_diagnosis")
    private String boneDiagnosis;


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
