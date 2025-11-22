package group29.hust.controller;

import group29.hust.dtos.request.DiagnoseFinalDTO;
import group29.hust.service.IDiagnoseFinalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/diagnose-final")
public class DiagnoseFinalController {
    
    private final IDiagnoseFinalService diagnoseFinalService;
    
    @PostMapping
    public ResponseEntity<DiagnoseFinalDTO> createDiagnoseFinal(@Valid @RequestBody DiagnoseFinalDTO diagnoseFinalDTO) {
        DiagnoseFinalDTO createdDiagnoseFinal = diagnoseFinalService.insert(diagnoseFinalDTO);
        return new ResponseEntity<>(createdDiagnoseFinal, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DiagnoseFinalDTO> getDiagnoseFinalById(@PathVariable Long id) {
        DiagnoseFinalDTO diagnoseFinalDTO = diagnoseFinalService.getById(id);
        return ResponseEntity.ok(diagnoseFinalDTO);
    }

    @GetMapping("/medical-exam/{id}")
    public ResponseEntity<DiagnoseFinalDTO> getDiagnoseFinalByPatientId(@PathVariable Long id) {
        DiagnoseFinalDTO diagnoseFinalDTO = diagnoseFinalService.findDiagnoseFinalWithMedicalExamId(id);
        return ResponseEntity.ok(diagnoseFinalDTO);
    }
    @GetMapping("/medical/{id}")
    public ResponseEntity<DiagnoseFinalDTO> getDiagnoseFinalByMedicalExamId(@PathVariable Long id) {
        DiagnoseFinalDTO diagnoseFinalDTO = diagnoseFinalService.findDiagnoseFinalWithPatientId(id);
        return ResponseEntity.ok(diagnoseFinalDTO);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DiagnoseFinalDTO> updateDiagnoseFinal(@PathVariable Long id, @Valid @RequestBody DiagnoseFinalDTO diagnoseFinalDTO) {
        diagnoseFinalDTO.setId(id);
        DiagnoseFinalDTO updatedDiagnoseFinal = diagnoseFinalService.update(diagnoseFinalDTO);
        return ResponseEntity.ok(updatedDiagnoseFinal);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiagnoseFinal(@PathVariable Long id) {
        diagnoseFinalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
