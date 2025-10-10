package group29.hust.model.entites;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blood_test")
public class BloodTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String conclusion;

    private BigDecimal glucose;

    private BigDecimal urea;

    private BigDecimal rbc;

    private BigDecimal hb;

    private BigDecimal hct;

    private BigDecimal mcv;

    private BigDecimal mch;

    private BigDecimal wbc;

    private BigDecimal neut;

    @Column(nullable = false)
    private String bloodGroup;
    @Column(nullable = false)
    private String bloodType;
}
