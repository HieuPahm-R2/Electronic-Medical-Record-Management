package group29.hust.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import group29.hust.dtos.request.ClinicalServiceDTO;
import group29.hust.model.MedicalExam;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BloodTestRes {
    private Long id;

    private String conclusion;

    private BigDecimal glucose;

    private BigDecimal urea;

    private BigDecimal rbc;

    private BigDecimal hb;

    private BigDecimal hct;

    private BigDecimal mcv;

    private BigDecimal mch;

    private BigDecimal wbc;

    private BigDecimal neut;

    @NotNull(message = "Blood group is required")
    @JsonProperty("blood_group")
    private String bloodGroup;

    @JsonProperty("blood_type")
    private String bloodType;

    @JsonProperty("image_url")
    private String imageUrl;

    @NotNull(message = "Patient ID is required")
    @JsonProperty("patient_id")
    private Long patientId;

    @JsonProperty("clinical_services")
    private ClinicalServiceDTO clinicalServices;

    @JsonProperty("medical_exam_id")
    private Long medicalExamId;
}
