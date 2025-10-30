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

    @Column(name = "referral_source")
    private String referralSource;

    @Column(name = "symptoms", columnDefinition = "TEXT")
    private String symptoms;

    @Column(name = "reason", nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Column(name = "days_of_symptoms")
    private Integer daysOfSymptoms;

    @Column(name = "has_allergy", nullable = false)
    private boolean hasAllergy = false;

    @Column(name = "allergy_months")
    private Integer allergyMonths;

    @Column(name = "uses_drugs", nullable = false)
    private boolean usesDrugs = false;

    @Column(name = "drugs_months")
    private Integer drugsMonths;

    @Column(name = "uses_alcohol", nullable = false)
    private boolean usesAlcohol = false;

    @Column(name = "alcohol_months")
    private Integer alcoholMonths;

    @Column(name = "uses_tobacco", nullable = false)
    private boolean usesTobacco = false;

    @Column(name = "tobacco_months")
    private Integer tobaccoMonths;

    @Column(name = "has_other", nullable = false)
    private boolean hasOther = false;

    @Column(name = "other_months")
    private Integer otherMonths;

    @Lob
    @Column(name = "other_description")
    private String otherDescription;

    @Column(name = "personal_medical_history", columnDefinition = "TEXT")
    private String personalMedicalHistory;

    @Column(name = "family_medical_history", columnDefinition = "TEXT")
    private String familyMedicalHistory;

    // relationships: ----
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}
