package group29.hust.dtos.request;

import jakarta.persistence.Column;
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

    private Integer heartRate;

    private String bloodGroup;

    private String bloodType;

    private Integer systolicBp;

    private Integer diastolicBp;

    private Integer pulseRate;

    private Integer respiratoryRate;

    private String notes;

    private Long patientId;
}
