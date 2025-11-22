package group29.hust.dtos.request;

import group29.hust.model.Department;
import group29.hust.model.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
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

    private String personalMedicalHistory;

    private String familyMedicalHistory;

    private PatientDTO patient;

    private DepartmentDTO department;

}
