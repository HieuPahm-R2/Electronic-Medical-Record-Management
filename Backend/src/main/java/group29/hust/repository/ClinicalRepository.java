package group29.hust.repository;

import group29.hust.model.ClinicalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Set;

public interface ClinicalRepository extends JpaRepository<ClinicalService, Long>, JpaSpecificationExecutor<ClinicalService> {
    Set<ClinicalService> findByIdIn(Set<Long> ids);

}
