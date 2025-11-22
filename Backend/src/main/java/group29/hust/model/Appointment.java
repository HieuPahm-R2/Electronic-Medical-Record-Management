package group29.hust.model;

import group29.hust.utils.constant.AppointmentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "appointments")
public class Appointment extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotBlank(message = "Not to blank here..!")
    private String fullName;

    @Column(name = "appointment_start_time", nullable = false)
    private LocalDateTime appointmentStartTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @Lob
    @NotBlank(message = "Not to blank here..!")
    @Column(name = "contact")
    private String contact;

    @Lob
    @Column(name = "notes")
    private String notes;

    // Relationship with ClinicalService (many-to-many)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "appointment_clinical_service",
        joinColumns = @JoinColumn(name = "appointment_id"),
        inverseJoinColumns = @JoinColumn(name = "clinical_service_id")
    )
    private Set<ClinicalService> clinicalServices = new HashSet<>();
}
