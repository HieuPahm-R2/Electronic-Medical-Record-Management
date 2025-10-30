package group29.hust.controller;
package group29.hust.controller;

import group29.hust.dtos.request.VitalSignDTO;
import group29.hust.exception.BadActionException;
import group29.hust.service.IVitalSignService;
import group29.hust.utils.anotation.MessageApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/vital-signs")
public class VitalSignController {

    private final IVitalSignService vitalSignService;

    @PostMapping
    @MessageApi("Create a new vital sign record")
    public ResponseEntity<VitalSignDTO> createVitalSign(@Valid @RequestBody VitalSignDTO vitalSignDTO) {
        VitalSignDTO createdVitalSign = vitalSignService.insert(vitalSignDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVitalSign);
    }

    @GetMapping("/{id}")
    @MessageApi("Get vital sign record by ID")
    public ResponseEntity<VitalSignDTO> getVitalSignById(@PathVariable Long id) {
        VitalSignDTO vitalSignDTO = vitalSignService.getById(id);
        return ResponseEntity.ok(vitalSignDTO);
    }

    @PutMapping
    @MessageApi("Update vital sign record")
    public ResponseEntity<VitalSignDTO> updateVitalSign(@Valid @RequestBody VitalSignDTO vitalSignDTO) throws BadActionException {
        if (vitalSignDTO.getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        VitalSignDTO updatedVitalSign = vitalSignService.update(vitalSignDTO);
        return ResponseEntity.ok(updatedVitalSign);
    }

    @DeleteMapping("/{id}")
    @MessageApi("Delete vital sign record")
    public ResponseEntity<Void> deleteVitalSign(@PathVariable Long id) {
        vitalSignService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Additional endpoint to get vital signs for a specific patient
    @GetMapping("/patient/{patientId}")
    @MessageApi("Get vital signs for a specific patient")
    public ResponseEntity<?> getVitalSignsByPatientId(@PathVariable Long patientId) {
        // This would require adding a method in the service layer
        // You can implement this later if needed
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class VitalSignController {
}
