package group29.hust.model;

import java.time.LocalDate;
import java.time.Year;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_code", length = 30)
    private String patientCode;

    @Column(length = 50, nullable = false)
    private String fullName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(length = 100, columnDefinition = "varchar(100) default ''")
    private String email;

    @Column(length = 15, nullable = false)
    private String phone;

    @Column(length = 20, nullable = false)
    private String nationality;

    @Column(length = 255, nullable = false)
    private String address;

    @Column(length = 50, nullable = false)
    private String identityCard;

    @Column(length = 50, nullable = false)
    private String insuranceNumber;

    private LocalDate insuranceExpired;

    @Column(length = 10, nullable = false)
    private String gender;

    @Column(length = 50, nullable = false)
    private String career;

    @Column(length = 50, nullable = false)
    private String relativeName;

    @Column(length = 35, nullable = false)
    private String relativePhone;

    @Column(length = 35, nullable = false)
    private String ethnicity;

    @Column(length = 35, nullable = false, name = "religion")
    private String religion;
    // --- Relationships ---

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MedicalExam> medicalExaminations;

    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private VitalSign vitalSigns;

    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private BloodTest bloodTests;

    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private ClinicalInfo clinicalInfos;

    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private Radiology radiologies;

    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private DiagnoseFinal diagnoseFinals;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Override
   protected void onCreate() {
        super.onCreate();
        this.generatePatientCode();
    }
    public void generatePatientCode() {
        if (this.patientCode == null || this.patientCode.isEmpty()) {
            String prefix = String.valueOf(Year.now().getValue());
            String randomPart = UUID.randomUUID()
                    .toString()
                    .replace("-", "")
                    .substring(0, 6)
                    .toUpperCase();
            this.patientCode = prefix + randomPart; // VD: 2025A3F9C1
        }
    }
}
