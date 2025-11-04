package group29.hust.service;

import group29.hust.dtos.request.VitalSignDTO;

public interface IVitalSignService extends ICrudService<VitalSignDTO, Long> {
    VitalSignDTO findVitalSignWithPatientId(Long patientId);
}
