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

}
