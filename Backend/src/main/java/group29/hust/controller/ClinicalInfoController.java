package group29.hust.controller;

import group29.hust.dtos.request.ClinicalInfoDTO;
import group29.hust.exception.BadActionException;
import group29.hust.repository.ClinicalInfoRepository;
import group29.hust.service.IClinicalInfoService;
import group29.hust.utils.anotation.MessageApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/clinical-info")
@RequiredArgsConstructor
public class ClinicalInfoController {
    private final IClinicalInfoService clinicalInfoService;
    private final ClinicalInfoRepository clinicalInfoRepository;

    @PostMapping("")
    @MessageApi("Add clinical information")
    public ResponseEntity<?> createClinicalInfo(@Valid @RequestBody ClinicalInfoDTO clinicalInfo) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(clinicalInfoService.insert(clinicalInfo));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error adding clinical information: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @MessageApi("Get clinical information by ID")
    public ResponseEntity<?> getClinicalInfoById(@PathVariable("id") Long id) {
        try {
            ClinicalInfoDTO clinicalInfo = clinicalInfoService.getById(id);
            return ResponseEntity.ok(clinicalInfo);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Error retrieving clinical information: " + e.getMessage());
        }
    }

    @PutMapping("")
    @MessageApi("Update clinical information")
    public ResponseEntity<?> updateClinicalInfo(@Valid @RequestBody ClinicalInfoDTO clinicalInfo) {
        try {
            return ResponseEntity.ok(clinicalInfoService.update(clinicalInfo));
        } catch (BadActionException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error updating clinical information: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @MessageApi("Delete clinical information")
    public ResponseEntity<Void> deleteClinicalInfo(@PathVariable("id") Long id) throws BadActionException {
        if (!clinicalInfoRepository.existsById(id)) {
            throw new BadActionException("Clinical information not found with ID: " + id);
        }
        clinicalInfoService.delete(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/patient/{patientId}")
    @MessageApi("Get vital signs for a specific patient")
    public ResponseEntity<?> getByPatientId(@PathVariable Long patientId) {
        //e service layer
        try {
            return ResponseEntity.ok(clinicalInfoService.findClinicalInfoWithPatientId(patientId));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Error in getVitalSignsByPatientId: " + e.getMessage());
        }
    }
}
