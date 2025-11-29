package group29.hust.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private LocalDateTime arrivalTime;

    @Column(name = "reception_time")
    private LocalDateTime receptionTime;

    @Column(name = "referral_source")
    private String referralSource;

    @Column(name = "symptoms", columnDefinition = "TEXT")
    private String symptoms;

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "days_of_symptoms")
    private Integer daysOfSymptoms;

    @Column(name = "has_allergy")
    private boolean hasAllergy = false;

    @Column(name = "allergy_months")
    private Integer allergyMonths;

    @Column(name = "uses_drugs")
    private boolean usesDrugs = false;

    @Column(name = "drugs_months")
    private Integer drugsMonths;

    @Column(name = "uses_alcohol")
    private boolean usesAlcohol = false;

    @Column(name = "alcohol_months")
    private Integer alcoholMonths;

    @Column(name = "uses_tobacco")
    private boolean usesTobacco = false;

    @Column(name = "tobacco_months")
    private Integer tobaccoMonths;

    @Column(name = "has_other")
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
    @JoinColumn(name = "department_id")
    private Department department;

    @OneToOne(mappedBy = "medicalExamination", cascade = CascadeType.ALL)
    private VitalSign vitalSign;

    @OneToOne(mappedBy = "medicalExam", cascade = CascadeType.ALL)
    private ClinicalInfo clinicalInfo;

    @OneToOne(mappedBy = "medicalExamination", cascade = CascadeType.ALL)
    private DiagnoseFinal diagnoseFinal;

    @OneToOne(mappedBy = "medicalExamination", cascade = CascadeType.ALL)
    private Radiology radiologyResults;

    @OneToOne(mappedBy = "medicalExamination", cascade = CascadeType.ALL)
    private BloodTest bloodTests;
}
