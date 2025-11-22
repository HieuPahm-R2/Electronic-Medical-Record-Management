package group29.hust.configuration;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import group29.hust.model.Permission;
import group29.hust.model.Role;
import group29.hust.model.User;
import group29.hust.repository.PermissionRepository;
import group29.hust.repository.RoleRepository;
import group29.hust.repository.UserRepository;

@Service
public class DatabaseInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseInitializer(RoleRepository roleRepository, PermissionRepository permissionRepository,
            UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(">>>>>>>>> INITIAL DATABASE BEGINS:");
        long countPermission = this.permissionRepository.count();
        long countRole = this.roleRepository.count();
        long countUser = this.userRepository.count();

        if (countPermission == 0) {
            ArrayList<Permission> arrResult = new ArrayList<>();
            arrResult.add(new Permission("Create a patient ", "/api/v1/add-patient", "POST", "PATIENTS"));
            arrResult.add(new Permission("Update a patient", "/api/v1/update-patient", "PUT", "PATIENTS"));
            arrResult.add(new Permission("Delete a patient ", "/api/v1/delete-patient/{id}", "DELETE", "PATIENTS"));
            arrResult.add(new Permission("Get patient by id", "/api/v1/patient/{id}", "GET", "PATIENTS"));
            arrResult.add(new Permission("Get patients with pagination", "/api/v1/patients", "GET", "PATIENTS"));

            arrResult.add(new Permission("Create a permission", "/api/v1/add-permission", "POST", "PERMISSIONS"));
            arrResult.add(new Permission("Update a permission", "/api/v1/update-permission", "PUT", "PERMISSIONS"));
            arrResult.add(
                    new Permission("Delete a permission", "/api/v1/delete-permission/{id}", "DELETE", "PERMISSIONS"));
            arrResult.add(new Permission("Get a permission by id", "/api/v1/permission/{id}", "GET", "PERMISSIONS"));
            arrResult
                    .add(new Permission("Get permission with pagination", "/api/v1/permissions", "GET", "PERMISSIONS"));

            arrResult.add(new Permission("Create a Medical Exam", "/api/v1/medical-exams", "POST", "MEDICAL_EXAMS"));
            arrResult.add(new Permission("Update a Medical Exam", "/api/v1/medical-exams", "PUT", "MEDICAL_EXAMS"));
            arrResult.add(new Permission("Delete a Medical Exam", "/api/v1/medical-exams/{id}", "DELETE", "MEDICAL_EXAMS"));
            arrResult.add(new Permission("Get Medical Exam by id", "/api/v1/medical-exams/{id}", "GET", "MEDICAL_EXAMS"));
            arrResult.add(new Permission("Get Medical Exam by patient id", "/api/v1/medical-exams/patient/{id}", "GET", "MEDICAL_EXAMS"));
            arrResult.add(new Permission("Get Medical Exam with pagination", "/api/v1/medical-exams", "GET", "MEDICAL_EXAMS"));

            arrResult.add(new Permission("Create a Clinical info", "/api/v1/clinical-info", "POST", "CLINICAL_INFOS"));
            arrResult.add(new Permission("Update a Clinical info", "/api/v1/clinical-info", "PUT", "CLINICAL_INFOS"));
            arrResult.add(new Permission("Delete a Clinical info", "/api/v1/clinical-info/{id}", "DELETE", "CLINICAL_INFOS"));
            arrResult.add(new Permission("Get Clinical info by id", "/api/v1/clinical-info/{id}", "GET", "CLINICAL_INFOS"));
            arrResult.add(new Permission("Get Clinical info by patient Id", "/api/v1/clinical-info/patient/{id}", "GET", "CLINICAL_INFOS"));

            arrResult.add(new Permission("Create a vital sign", "/api/v1/vital-signs", "POST", "VITAL_SIGNS"));
            arrResult.add(new Permission("Update a vital sign", "/api/v1/vital-signs", "PUT", "VITAL_SIGNS"));
            arrResult.add(new Permission("Delete a vital sign", "/api/v1/vital-signs/{id}", "DELETE", "VITAL_SIGNS"));
            arrResult.add(new Permission("Get vital sign by id", "/api/v1/vital-signs/{id}", "GET", "VITAL_SIGNS"));
            arrResult.add(new Permission("Get vital sign with patient id", "/api/v1/vital-signs/patient/{id}", "GET", "VITAL_SIGNS"));

            arrResult.add(new Permission("Create a blood test", "/api/v1/blood-tests", "POST", "BLOOD_TESTS"));
            arrResult.add(new Permission("Update a blood test", "/api/v1/blood-tests", "PUT", "BLOOD_TESTS"));
            arrResult.add(new Permission("Delete a blood test", "/api/v1/blood-tests/{id}", "DELETE", "BLOOD_TESTS"));
            arrResult.add(new Permission("Get blood test by id", "/api/v1/blood-tests/{id}", "GET", "BLOOD_TESTS"));
            arrResult.add(new Permission("Get blood test with pagination by patient", "/api/v1/blood-tests/patient/{id}", "GET", "BLOOD_TESTS"));
            arrResult.add(new Permission("Get blood test with pagination by medical-exam", "/api/v1/blood-tests/medical-exam/{id}", "GET", "BLOOD_TESTS"));

            arrResult.add(new Permission("Create a radiology", "/api/v1/radiology", "POST", "RADIOLOGIES"));
            arrResult.add(new Permission("Update a radiology", "/api/v1/radiology", "PUT", "RADIOLOGIES"));
            arrResult.add(new Permission("Delete a radiology", "/api/v1/radiology/{id}", "DELETE", "RADIOLOGIES"));
            arrResult.add(new Permission("Get radiology by id", "/api/v1/radiology/{id}", "GET", "RADIOLOGIES"));
            arrResult.add(new Permission("Get radiology with pagination by patient", "/api/v1/radiology/patient/{id}", "GET", "RADIOLOGIES"));
            arrResult.add(new Permission("Get radiology with pagination by medical exam", "/api/v1/radiology/medical-exam/{id}", "GET", "RADIOLOGIES"));

            arrResult.add(new Permission("Create a diagnose final", "/api/v1/diagnose-final", "POST", "DIAGNOSE_FINALS"));
            arrResult.add(new Permission("Update a diagnose final", "/api/v1/diagnose-final", "PUT", "DIAGNOSE_FINALS"));
            arrResult.add(new Permission("Delete a diagnose final", "/api/v1/diagnose-final/{id}", "DELETE", "DIAGNOSE_FINALS"));
            arrResult.add(new Permission("Get diagnose final by id", "/api/v1/diagnose-final/{id}", "GET", "DIAGNOSE_FINALS"));
            arrResult.add(new Permission("Get df with pagination by patient", "/api/v1/diagnose-final/patient/{id}", "GET", "DIAGNOSE_FINALS"));
            arrResult.add(new Permission("Get df with pagination by medical exam", "/api/v1/diagnose-final/medical-exam/{id}", "GET", "DIAGNOSE_FINALS"));

            arrResult.add(new Permission("Create a appointment", "/api/v1/appointments", "POST", "APPOINTMENTS"));
            arrResult.add(new Permission("Update a appointment", "/api/v1/appointments", "PUT", "APPOINTMENTS"));
            arrResult.add(new Permission("Delete a appointment", "/api/v1/appointments/{id}", "DELETE", "APPOINTMENTS"));
            arrResult.add(new Permission("Get appointment by id", "/api/v1/appointments/{id}", "GET", "APPOINTMENTS"));
            arrResult.add(new Permission("Get appointments with pagination", "/api/v1/appointments", "GET", "APPOINTMENTS"));

            arrResult.add(new Permission("Create a role", "/api/v1/add-role", "POST", "ROLES"));
            arrResult.add(new Permission("Update a role", "/api/v1/update-role", "PUT", "ROLES"));
            arrResult.add(new Permission("Delete a role", "/api/v1/delete-role/{id}", "DELETE", "ROLES"));
            arrResult.add(new Permission("Get role by id", "/api/v1/role/{id}", "GET", "ROLES"));
            arrResult.add(new Permission("Get roles with pagination", "/api/v1/roles", "GET", "ROLES"));

            arrResult.add(new Permission("Create a user", "/api/v1/add-user", "POST", "USERS"));
            arrResult.add(new Permission("Update a user", "/api/v1/update-user", "PUT", "USERS"));
            arrResult.add(new Permission("Delete a user", "/api/v1/delete-user/{id}", "DELETE", "USERS"));
            arrResult.add(new Permission("Get a user by id", "/api/v1/user/{id}", "GET", "USERS"));
            arrResult.add(new Permission("Get users with pagination", "/api/v1/users", "GET", "USERS"));

            arrResult.add(new Permission("Upload video", "/api/v1/upload/video", "POST", "EPISODES"));
            arrResult.add(new Permission("Upload file", "/api/v1/files", "POST", "FILES"));


            this.permissionRepository.saveAll(arrResult);
        }
        if (countRole >= 0) {
            List<Permission> permissions = this.permissionRepository.findAll();

            Role initRole = new Role();
            initRole.setName("ADMIN");
            initRole.setDescription("Contain full of permissions on this web service");
            initRole.setActive(true);
            initRole.setPermissions(permissions);

            this.roleRepository.save(initRole);
        }
        if (countUser == 0) {
            User initUser = new User();
            initUser.setUsername("HieuPahmR2");
            initUser.setEmail("admin@gmail.com");
            initUser.setPassword(this.passwordEncoder.encode("123456"));

            Role userRole = this.roleRepository.findByName("ADMIN");
            if (userRole != null) {
                initUser.setRole(userRole);
            }
            this.userRepository.save(initUser);
        }
        if (countRole > 0 && countPermission > 0 && countUser > 0) {
            System.out.println("SKIP INITIAL DATABASE");
        } else {
            System.out.println("END TASK");
        }
    }
}
