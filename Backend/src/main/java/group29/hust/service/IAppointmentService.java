package group29.hust.service;

import group29.hust.dtos.request.AppointmentDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Appointment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface IAppointmentService {
    public Appointment insert(AppointmentDTO dto);

    public Appointment getById(Long id);

    public Appointment update(AppointmentDTO dto) throws BadActionException;

    public void delete(Long id);

    PaginationResultDTO getAllWithPaginate(Specification<Appointment> spec, Pageable pageable);
}
