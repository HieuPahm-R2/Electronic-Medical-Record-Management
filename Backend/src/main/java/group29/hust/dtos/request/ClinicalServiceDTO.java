package group29.hust.dtos.request;

import jakarta.persistence.Column;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalServiceDTO {
    private Long id;
    private String serviceName;

    public ClinicalServiceDTO(Long id) {
        this.id = id;
    }
}
