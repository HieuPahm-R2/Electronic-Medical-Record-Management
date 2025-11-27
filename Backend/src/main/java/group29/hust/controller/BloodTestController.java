package group29.hust.controller;
import group29.hust.dtos.request.BloodTestDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.service.IBloodTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/blood-tests")
@RequiredArgsConstructor
public class BloodTestController {

    private final IBloodTestService bloodTestService;

    @PostMapping("")
    public ResponseEntity<BloodTestDTO> createBloodTest(@Valid @RequestBody BloodTestDTO bloodTestDTO) {
        BloodTestDTO createdBloodTest = bloodTestService.insert(bloodTestDTO);
        return new ResponseEntity<>(createdBloodTest, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodTestDTO> getBloodTestById(@PathVariable Long id) {
        BloodTestDTO bloodTestDTO = bloodTestService.getById(id);
        return ResponseEntity.ok(bloodTestDTO);
    }

    @PutMapping
    public ResponseEntity<BloodTestDTO> updateBloodTest( @Valid @RequestBody BloodTestDTO bloodTestDTO) {
        BloodTestDTO updatedBloodTest = bloodTestService.update(bloodTestDTO);
        return ResponseEntity.ok(updatedBloodTest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBloodTest(@PathVariable Long id) {
        bloodTestService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<BloodTestDTO> getBloodTestsByPatientId(@PathVariable Long id) {
        return ResponseEntity.ok().body(bloodTestService.getByPatientId(id));
    }
    @GetMapping("/medical-exam/{id}")
    public ResponseEntity<BloodTestDTO> getByMedicalExamId(@PathVariable Long id) {
        return ResponseEntity.ok().body(bloodTestService.getByMedicalExamId(id));
    }


}

