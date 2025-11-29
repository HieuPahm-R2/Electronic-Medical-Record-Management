package group29.hust.dtos.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import group29.hust.model.Department;
import group29.hust.model.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalExamDTO {
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime arrivalTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime receptionTime;

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

    private Long patient;

    private DepartmentDTO department;

}
