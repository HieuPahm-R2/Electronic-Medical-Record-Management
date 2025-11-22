package group29.hust.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    private Long id;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    // relationships

    @ManyToMany(mappedBy = "clinicalServices")
    @JsonIgnore
    private Set<ClinicalInfo> clinicalInfos;
    
    @ManyToMany(mappedBy = "clinicalServices")
    @JsonIgnore
    private Set<Appointment> appointments = new HashSet<>();
}
