package group29.hust.controller;

import group29.hust.dtos.request.MedicalExamDTO;
import group29.hust.exception.BadActionException;
import group29.hust.service.IMedicalExamService;
import group29.hust.utils.anotation.MessageApi;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/medical-exams")
@RequiredArgsConstructor
public class MedicalExamController {
    private final IMedicalExamService medicalExamService;

    @PostMapping
    @MessageApi("Medical examination created successfully")
    public ResponseEntity<?> createMedicalExam(@RequestBody MedicalExamDTO medicalExamDTO, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> res = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(res);
            }
            MedicalExamDTO createdMedicalExam = medicalExamService.insert(medicalExamDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMedicalExam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @MessageApi("Medical examination retrieved successfully")
    public ResponseEntity<?> getMedicalExamById(@PathVariable Long id) {
        MedicalExamDTO medicalExamDTO = medicalExamService.getById(id);
        return ResponseEntity.ok(medicalExamDTO);
    }

    @PutMapping("/{id}")
    @MessageApi("Medical examination updated successfully")
    public ResponseEntity<?> updateMedicalExam(
            @PathVariable Long id,
            @RequestBody MedicalExamDTO medicalExamDTO) throws BadActionException {
        medicalExamDTO.setId(id);
        MedicalExamDTO updatedMedicalExam = medicalExamService.update(medicalExamDTO);
        return ResponseEntity.ok(updatedMedicalExam);
    }

    @DeleteMapping("/{id}")
    @MessageApi("Medical examination deleted successfully")
    public ResponseEntity<Void> deleteMedicalExam(@PathVariable Long id) {
        medicalExamService.delete(id);
        return ResponseEntity.ok().build();
    }
}
