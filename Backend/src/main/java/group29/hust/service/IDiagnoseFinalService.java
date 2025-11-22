package group29.hust.service;

import group29.hust.dtos.request.DiagnoseFinalDTO;

public interface IDiagnoseFinalService extends ICrudService<DiagnoseFinalDTO, Long> {
    public DiagnoseFinalDTO findDiagnoseFinalWithPatientId(Long patientId);
    public DiagnoseFinalDTO findDiagnoseFinalWithMedicalExamId(Long medicalExamId);
}
