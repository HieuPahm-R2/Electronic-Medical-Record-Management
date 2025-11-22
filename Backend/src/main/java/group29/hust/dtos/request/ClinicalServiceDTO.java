package group29.hust.dtos.request;

import jakarta.persistence.Column;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
@NoArgsConstructor
public class ClinicalServiceDTO {
    private Long id;
    private String serviceName;
}
