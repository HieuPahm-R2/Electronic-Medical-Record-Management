package group29.hust.controller;

import com.turkraft.springfilter.boot.Filter;
import group29.hust.dtos.request.AppointmentDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.model.Appointment;
import group29.hust.service.IAppointmentService;
import group29.hust.utils.anotation.MessageApi;
import group29.hust.utils.constant.AppointmentStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final IAppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) {
        Appointment createdAppointment = appointmentService.insert(appointmentDTO);
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.getById(id);
        return ResponseEntity.ok(appointment);
    }

    @PutMapping
    public ResponseEntity<Appointment> updateAppointment( @Valid @RequestBody AppointmentDTO appointmentDTO) {
        Appointment updatedAppointment = appointmentService.update(appointmentDTO);
        return ResponseEntity.ok(updatedAppointment);
    }

//    @PatchMapping("/{id}/status")
//    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
//        Appointment appointment = appointmentService.getById(id);
//        AppointmentDTO dto = AppointmentDTO.builder()
//                .notes(appointment.getNotes())
//                .appointmentStartTime(appointment.getAppointmentStartTime())
//                .fullName(appointment.getFullName())
//                .contact(appointment.getContact())
//                .clinicalServices(appointment.getClinicalServices())
//                .build();
//        Appointment updatedAppointment = appointmentService.update(dto);
//        return ResponseEntity.ok(updatedAppointment);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @MessageApi("fetch all action")
    public ResponseEntity<PaginationResultDTO> handleFetchAllRole(
            @Filter Specification<Appointment> spec, Pageable pageable) {
        return ResponseEntity.ok().body(this.appointmentService.getAllWithPaginate(spec, pageable));
    }
}
