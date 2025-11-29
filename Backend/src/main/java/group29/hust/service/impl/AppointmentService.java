package group29.hust.service.impl;

import group29.hust.dtos.request.AppointmentDTO;
import group29.hust.dtos.request.EmailRes;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Appointment;
import group29.hust.model.ClinicalService;
import group29.hust.model.Patient;
import group29.hust.model.User;
import group29.hust.repository.AppointmentRepository;
import group29.hust.repository.ClinicalRepository;
import group29.hust.repository.PatientRepository;
import group29.hust.repository.UserRepository;
import group29.hust.service.IAppointmentService;
import group29.hust.utils.constant.AppointmentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService implements IAppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final ClinicalRepository skillRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;

    @Override
    public Appointment insert(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        
        // Set basic properties
        appointment.setAppointmentStartTime(dto.getAppointmentStartTime());
        appointment.setFullName(dto.getFullName());
        appointment.setStatus(AppointmentStatus.PENDING);  // Default status for new appointments
        appointment.setContact(dto.getContact());
        appointment.setNotes(dto.getNotes());
        if(dto.getClinicalServices() != null){
            Set<Long> reqSkills = dto.getClinicalServices().stream().map(ClinicalService::getId).collect(Collectors.toSet());
            Set<ClinicalService> mainSkills = this.skillRepository.findByIdIn(reqSkills);
            dto.setClinicalServices(mainSkills);
            appointment.setClinicalServices(dto.getClinicalServices());
        }
        // Set user (doctor) if provided
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment getById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new BadActionException("Appointment not found with id: " + id));
    }

    @Override
    public Appointment update(AppointmentDTO dto) throws BadActionException {
        Appointment existingAppointment = appointmentRepository.findById(dto.getId())
                .orElseThrow(() -> new BadActionException("Appointment not found with id: " + dto.getId()));
        
        // Check status is being updated to ACCEPTED
        boolean statusChangedToAccepted = 
            dto.getStatus() == AppointmentStatus.SCHEDULED &&
            existingAppointment.getStatus() != AppointmentStatus.SCHEDULED;
        
        // Update appointment fields
        if (dto.getAppointmentStartTime() != null) {
            existingAppointment.setAppointmentStartTime(dto.getAppointmentStartTime());
        }
        
        if (dto.getStatus() != null) {
            existingAppointment.setStatus(dto.getStatus());
        }

        if (dto.getContact() != null) {
            existingAppointment.setContact(dto.getContact());
        }
        if (dto.getFullName() != null) {
            existingAppointment.setFullName(dto.getFullName());
        }
        if (dto.getNotes() != null) {
            existingAppointment.setNotes(dto.getNotes());
        }
        if (dto.getClinicalServices() != null) {
            existingAppointment.setClinicalServices(dto.getClinicalServices());
        }
        
        // Save the updated appointment
        Appointment updatedAppointment = appointmentRepository.save(existingAppointment);
        
        // Send email notification if status changed to ACCEPTED
        if (statusChangedToAccepted) {
            this.sendSubscribersEmailJobs(dto.getId());
        }
        return updatedAppointment;
    }

    @Override
    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public PaginationResultDTO getAllWithPaginate(Specification<Appointment> spec, Pageable pageable) {
        Page<Appointment> page = this.appointmentRepository.findAll(spec, pageable);

        PaginationResultDTO rs = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();

        mt.setPage(page.getNumber() + 1);
        mt.setPageSize(page.getSize());
        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(page.getContent());
        return rs;
    }

    public EmailRes convertToEmailRes(Appointment app) {
        EmailRes res = new EmailRes();
        res.setName(app.getFullName());
        res.setTime(app.getAppointmentStartTime());
        res.setNotes(app.getNotes());

        Set<ClinicalService> skills = app.getClinicalServices();
        List<EmailRes.ClinicalServiceD> s = skills.stream().map(skill -> new EmailRes.ClinicalServiceD(skill.getServiceName()))
                .collect(Collectors.toList());
        res.setClinicalService(s);
        return res;
    }
    public void sendSubscribersEmailJobs(Long id) {
        Optional<Appointment> Subs = this.appointmentRepository.findById(id);
        if (Subs.isPresent()) {
            Appointment sub = Subs.get();
            EmailRes arr = this.convertToEmailRes(sub);
            this.emailService.sendEmailFromTemplateSync(
                        sub.getContact(),
                        "Thư xác nhận lịch hẹn thăm khám, DHBKHN",
                        "appointment-confirmation",
                        sub.getFullName(),
                        arr);
            }
        }
    }
