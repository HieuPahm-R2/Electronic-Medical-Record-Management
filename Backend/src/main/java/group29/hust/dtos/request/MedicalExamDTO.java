package group29.hust.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalExamDTO {
    private Long id;
    private LocalDate arrivalTime;
    private LocalDate receptionTime;
    private String referralSource;
    private String symptoms;
    private String reason;
    private Integer daysOfSymptoms;
    private String personalMedicalHistory;
    private String familyMedicalHistory;

    private boolean hasAllergy = false;
    private Integer allergyMonths;
    private boolean usesDrugs = false;
    private Integer drugsMonths;

    private boolean usesAlcohol = false;
    private Integer alcoholMonths;

    private boolean usesTobacco = false;
    private Integer tobaccoMonths;

    private boolean hasOther = false;
    private Integer otherMonths;
    private String otherDescription;

    private Long patientId;
    private Long departmentId;
}
