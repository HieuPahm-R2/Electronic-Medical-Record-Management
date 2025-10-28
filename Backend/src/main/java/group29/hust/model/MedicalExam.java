package group29.hust.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "medical_examinations")
@Getter
@Setter
public class MedicalExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "arrival_time")
    private LocalDate arrivalTime;

    @Column(name = "reception_time", nullable = false)
    private LocalDate receptionTime;

    @Column(name = "department_name", nullable = false)
    private String departmentName;

    @Column(name = "referral_source")
    private String referralSource;

    @Column(name = "symptoms", columnDefinition = "TEXT")
    private String symptoms;

    @Column(name = "reason", nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Column(name = "days_of_symptoms")
    private Integer daysOfSymptoms;

    @Column(name = "personal_medical_history", columnDefinition = "TEXT")
    private String personalMedicalHistory;

    @Column(name = "family_medical_history", columnDefinition = "TEXT")
    private String familyMedicalHistory;

    // relationships: ----
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
