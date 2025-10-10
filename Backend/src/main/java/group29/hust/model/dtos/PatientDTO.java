package group29.hust.model.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    private Long id;
    private String patientCode;
    private String fullName;
    private LocalDate dateOfBirth;
    private String email;
    private String phone;
    private String nationality;
    private String address;
    private String identityCard;
    private String insuranceNumber;
    private String insuranceExpired;
    private String gender;
    private String career;
    private String relativeName;
    private String relativePhone;
    private String createdAt;
    private String updatedAt;
    private String createdBy;
    private String updatedBy;
}
