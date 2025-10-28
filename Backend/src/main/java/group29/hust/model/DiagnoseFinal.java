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
@Table(name = "diagnose_final")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiagnoseFinal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "main_disease", nullable = false, length = 100)
    private String mainDisease;

    @Column(name = "comorbidity", nullable = false, length = 100)
    private String comorbidity;

    @Column(name = "conclusion", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String conclusion;

    @Column(name = "prognosis", columnDefinition = "TEXT")
    private String prognosis;

    @Column(name = "treatment_plan", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String treatmentPlan;

    // relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
