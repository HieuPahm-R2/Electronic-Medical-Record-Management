package group29.hust.service;

import group29.hust.model.DiagnoseFinal;

import java.util.List;

public interface DiagnoseFinalService extends ICrudService<DiagnoseFinal, Long> {
    List<DiagnoseFinal> findAll();
}
