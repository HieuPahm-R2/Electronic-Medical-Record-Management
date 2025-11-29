package group29.hust.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "departments")
public class Department extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Lob // Dùng @Lob cho kiểu TEXT
    @Column(name = "description")
    private String description;

    // Relationships: ---
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private Set<MedicalExam> medicalExaminations = new LinkedHashSet<>();;


}
