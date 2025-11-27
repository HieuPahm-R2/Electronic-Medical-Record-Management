package group29.hust.controller;

import com.turkraft.springfilter.boot.Filter;
import group29.hust.dtos.request.PatientDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.Patient;
import group29.hust.repository.PatientRepository;
import group29.hust.service.IPatientService;
import group29.hust.service.impl.PatientService;
import group29.hust.utils.anotation.MessageApi;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;
    private final PatientRepository patientRepository;

    @PostMapping("/add-patient")
    public ResponseEntity<?> addPatient(@RequestBody PatientDTO dto) {
        try {
            return ResponseEntity.ok(patientService.insert(dto));
        } catch (Exception e) {
            // In a real application, use a logger to log the exception
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error adding patient: " + e.getMessage());
        }
    }

    @PutMapping("/update-patient")
    @MessageApi("Update patient info")
    public ResponseEntity<?> updatePatient(@RequestBody PatientDTO dto) {
        return ResponseEntity.ok( patientService.update(dto));
    }

    @DeleteMapping("/delete-patient/{id}")
    @MessageApi("Delete patient")
    public ResponseEntity<Void> delete(@PathVariable("id") long id) throws BadActionException {
        if (this.patientRepository.findById(id).isEmpty()) {
            throw new BadActionException("Not Found this ID");
        }
        this.patientService.delete(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/patient/{id}")
    @MessageApi("Fetch patient by Id")
    public ResponseEntity<?> getPatientById(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(this.patientService.getById(id));
    }

    @GetMapping("/patients")
    @MessageApi("Fetch all patients with pagination")
    public ResponseEntity<PaginationResultDTO> getAllPatients(@Filter Specification<Patient> spec,
            Pageable pageable) {
        return ResponseEntity.ok().body(this.patientService.getAll(spec, pageable));
    }
}