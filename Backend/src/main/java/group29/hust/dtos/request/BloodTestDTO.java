package group29.hust.dtos.request;

import java.math.BigDecimal;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BloodTestDTO {
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
    private MedicalExamDTO medicalExamination;
}
