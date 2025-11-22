package group29.hust.dtos.response;

import group29.hust.model.Department;
import group29.hust.model.Patient;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalExamRes {
    private Long id;

    private Long patientId;

    private String department;
}
