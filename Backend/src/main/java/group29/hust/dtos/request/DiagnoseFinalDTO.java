package group29.hust.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import group29.hust.model.MedicalExam;
import group29.hust.model.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiagnoseFinalDTO {
    private Long id;

    @JsonProperty("main_disease")
    private String mainDisease;

    private String comorbidity;

    private String conclusion;

    private String prognosis;

    @JsonProperty("treatment_plan")
    private String treatmentPlan;

    @JsonProperty("patient_id")
    private Long patientId;

    @JsonProperty("medical_exam_id")
    private Long medicalExamId;
}
