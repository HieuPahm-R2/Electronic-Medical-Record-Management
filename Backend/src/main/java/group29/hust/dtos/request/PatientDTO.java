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

    @JsonProperty("insuranceExpired")
    private LocalDate insuranceExpired;

    private String gender;
    private String career;
    @JsonProperty("relativeName")
    private String relativeName;
    @JsonProperty("relativePhone")
    private String relativePhone;
    private String ethnicity;
    private String religion;

    @JsonProperty("createdAt")
    private Instant createdAt;
    @JsonProperty("updatedAt")
    private Instant updatedAt;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "updatedBy")
    private String updatedBy;
}
