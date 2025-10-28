package group29.hust.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "clinical_service")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    // relationships
    @OneToOne(mappedBy = "clinicalService", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private BloodTest bloodTest;

    @OneToOne(mappedBy = "clinicalService", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Radiology radiology;

    @OneToMany(mappedBy = "clinicalService", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ClinicalInfo> clinicalInfos;
}
