package group29.hust.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vital_signs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VitalSign extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "temperature", nullable = false, precision = 5, scale = 2)
    private BigDecimal temperature;

    @Column(name = "height", nullable = false, precision = 5, scale = 2)
    private BigDecimal height;

    @Column(name = "weight", nullable = false, precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "heart_rate", nullable = false)
    private Integer heartRate;

    @Column(name = "blood_group", nullable = false, length = 10)
    private String bloodGroup;

    @Column(name = "blood_type", nullable = false, length = 10)
    private String bloodType;

    @Column(name = "systolic_bp", nullable = false)
    private Integer systolicBp;

    @Column(name = "diastolic_bp", nullable = false)
    private Integer diastolicBp;

    @Column(name = "pulse_rate")
    private Integer pulseRate;

    @Column(name = "respiratory_rate")
    private Integer respiratoryRate;

    @Column(name = "notes", columnDefinition = "MEDIUMTEXT")
    private String notes;

    // relationships: ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
