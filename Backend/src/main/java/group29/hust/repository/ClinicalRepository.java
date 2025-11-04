package group29.hust.repository;

import group29.hust.model.ClinicalService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ClinicalRepository extends JpaRepository<ClinicalService, Long> {
    Set<ClinicalService> findByIdIn(List<Long> ids);
}
