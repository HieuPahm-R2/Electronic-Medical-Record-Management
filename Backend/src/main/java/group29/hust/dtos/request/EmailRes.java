package group29.hust.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class EmailRes {
    private String name;
    private LocalDateTime time;
    private String notes;
    private List<ClinicalServiceD> clinicalService;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class ClinicalServiceD{
        private String title;
    }
}
