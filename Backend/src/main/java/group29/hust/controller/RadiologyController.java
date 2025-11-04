package group29.hust.controller;

import group29.hust.dtos.request.RadiologyDTO;
import group29.hust.service.IRadiologyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/radiology")
@RequiredArgsConstructor
public class RadiologyController {
    private final IRadiologyService radiologyService;
    
    @PostMapping
    public ResponseEntity<RadiologyDTO> createRadiology(@RequestBody RadiologyDTO radiologyDTO) {
        RadiologyDTO createdRadiology = radiologyService.insert(radiologyDTO);
        return new ResponseEntity<>(createdRadiology, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RadiologyDTO> getRadiologyById(@PathVariable Long id) {
        RadiologyDTO radiologyDTO = radiologyService.getById(id);
        return ResponseEntity.ok(radiologyDTO);
    }
    
    @PutMapping
    public ResponseEntity<RadiologyDTO> updateRadiology(@RequestBody RadiologyDTO radiologyDTO) {
        RadiologyDTO updatedRadiology = radiologyService.update(radiologyDTO);
        return ResponseEntity.ok(updatedRadiology);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRadiology(@PathVariable Long id) {
        radiologyService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<RadiologyDTO>> getRadiologyByPatientId(@PathVariable Long patientId) {
        List<RadiologyDTO> radiologyDTOs = ((group29.hust.service.impl.RadiologyService) radiologyService).getByPatientId(patientId);
        return ResponseEntity.ok(radiologyDTOs);
    }
}
