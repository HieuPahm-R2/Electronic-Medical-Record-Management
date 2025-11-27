package group29.hust.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "clinical_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClinicalInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "circulatory_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String circulatoryDiagnosis;

    @Column(name = "respiratory_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String respiratoryDiagnosis;

    @Column(name = "genitourinary_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String genitourinaryDiagnosis;

    @Column(name = "bone_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String boneDiagnosis;

    @Column(name = "rhm_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String rhmDiagnosis;

    @Column(name = "digestive_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String digestiveDiagnosis;

    @Column(name = "nervous_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String nervousDiagnosis;

    @Column(name = "ent_diagnosis", nullable = false, columnDefinition = "TEXT")
    private String entDiagnosis;

    @Column(name = "other_diagnoses", nullable = false, columnDefinition = "TEXT")
    private String otherDiagnoses;

    @Column(name = "syndrome", columnDefinition = "TEXT")
    private String syndrome;

    // relationships
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "clinical_info" })
    @JoinTable(name = "clinical_match", joinColumns = @JoinColumn(name = "clinical_info_id"), inverseJoinColumns = @JoinColumn(name = "clinical_service_id"))
    private Set<ClinicalService> clinicalServices;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_examination_id", unique = true)
    private MedicalExam medicalExam;
}
