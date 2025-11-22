package group29.hust.dtos.request;

import java.time.Instant;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PatientDTO {
    private Long id;
    @JsonProperty("patientCode")
    private String patientCode;
    @JsonProperty("fullName")
    private String fullName;
    @JsonProperty("dateOfBirth")
    private LocalDate dateOfBirth;
    private String email;
    private String phone;
    private String nationality;
    private String address;
    @JsonProperty("identityCard")
    private String identityCard;
    @JsonProperty("insuranceNumber")
    private String insuranceNumber;
    @JsonProperty("insurance_expired")
    private String insuranceExpired;
    private String gender;
    private String career;
    @JsonProperty("relative_name")
    private String relativeName;
    @JsonProperty("relativePhone")
    private String relativePhone;

    @JsonProperty("createdAt")
    private Instant createdAt;
    @JsonProperty("updatedAt")
    private Instant updatedAt;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "updatedBy")
    private String updatedBy;
}
