package group29.hust.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import group29.hust.dtos.response.MedicalExamRes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VitalSignDTO {
    private Long id;

    private BigDecimal temperature;

    private BigDecimal height;

    private BigDecimal weight;

    @JsonProperty("heart_rate")
    private Integer heartRate;

    @JsonProperty("blood_group")
    private String bloodGroup;

    @JsonProperty("blood_type")
    private String bloodType;

    @JsonProperty("systolic_bp")
    private Integer systolicBp;

    @JsonProperty("diastolic_bp")
    private Integer diastolicBp;

    @JsonProperty("pulse_rate")
    private Integer pulseRate;

    @JsonProperty("respiratory_rate")
    private Integer respiratoryRate;

    private String notes;

    @JsonProperty("patient_id")
    private Long patientId;

    @JsonProperty("medical_exam_id")
    private MedicalExamRes medicalExam;
}
