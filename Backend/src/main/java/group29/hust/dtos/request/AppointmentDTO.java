package group29.hust.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import group29.hust.model.ClinicalService;
import group29.hust.model.Department;
import group29.hust.model.Patient;
import group29.hust.model.User;
import group29.hust.utils.constant.AppointmentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long id;

    @JsonProperty("full_name")
    private String fullName;

    private String contact;

    @JsonProperty("appointment_start_time")
    private LocalDateTime appointmentStartTime;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private String notes;

    @JsonProperty("clinical_services")
    private Set<ClinicalService> clinicalServices;

}
