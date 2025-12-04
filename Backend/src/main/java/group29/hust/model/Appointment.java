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

    @NotBlank(message = "Not to blank name..!")
    private String fullName;

    @Column(name = "appointment_start_time", nullable = false)
    private LocalDateTime appointmentStartTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @Lob
    @Column(name = "contact")
    private String contact;

    @NotBlank(message = "Not to blank phone..!")
    @Column(name = "phone")
    private String phone;

    @Lob
    @Column(name = "notes")
    private String notes;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "appointment_clinical_service",
        joinColumns = @JoinColumn(name = "appointment_id"),
        inverseJoinColumns = @JoinColumn(name = "clinical_service_id")
    )
    private Set<ClinicalService> clinicalServices = new HashSet<>();
}
