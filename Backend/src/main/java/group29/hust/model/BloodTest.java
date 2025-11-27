package group29.hust.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blood_test")
public class BloodTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "conclusion")
    private String conclusion;

    @Column(name = "glucose", precision = 38, scale = 2)
    private BigDecimal glucose;

    @Column(name = "urea", precision = 38, scale = 2)
    private BigDecimal urea;

    @Column(name = "rbc", precision = 38, scale = 2)
    private BigDecimal rbc;

    @Column(name = "hb", precision = 38, scale = 2)
    private BigDecimal hb;

    @Column(name = "hct", precision = 38, scale = 2)
    private BigDecimal hct;

    @Column(name = "mcv", precision = 38, scale = 2)
    private BigDecimal mcv;

    @Column(name = "mch", precision = 38, scale = 2)
    private BigDecimal mch;

    @Column(name = "wbc", precision = 38, scale = 2)
    private BigDecimal wbc;

    @Column(name = "neut", precision = 38, scale = 2)
    private BigDecimal neut;

    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Column(name = "blood_type", nullable = false)
    private String bloodType;

    @Column(name = "image_url",columnDefinition = "nvarchar(4000)")
    private String imageUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinical_service_id", nullable = false)
    private ClinicalService clinicalServices;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medical_examination_id", unique = true)
    private MedicalExam medicalExamination;

}
