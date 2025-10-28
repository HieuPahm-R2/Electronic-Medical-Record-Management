package group29.hust.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinical_service_id", nullable = false)
    private ClinicalService clinicalService;
}
