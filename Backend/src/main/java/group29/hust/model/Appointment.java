package group29.hust.model;

import group29.hust.utils.constant.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "appointment_start_time", nullable = false)
    private LocalDateTime appointmentStartTime;

    @Column(name = "appointment_end_time", nullable = false)
    private LocalDateTime appointmentEndTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @Lob // Dùng @Lob cho kiểu TEXT
    @Column(name = "reason")
    private String reason;

    @Lob
    @Column(name = "notes")
    private String notes;

    // relationships:
    // Nhiều lịch hẹn thuộc về MỘT bệnh nhân
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    // Nhiều lịch hẹn được thực hiện bởi MỘT bác sĩ (User)
    // nullable = true vì có thể đặt lịch với khoa chung, chưa rõ bác sĩ
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private User doctor;

    // Nhiều lịch hẹn thuộc về MỘT khoa
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    // Nhiều lịch hẹn được tạo bởi MỘT người dùng (lễ tân hoặc bệnh nhân)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User createdByUser;

}
