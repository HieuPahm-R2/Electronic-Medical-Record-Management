package group29.hust.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turkraft.springfilter.boot.Filter;

import group29.hust.dtos.UpdateUserDTO;
import group29.hust.dtos.UserDTO;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.exception.BadActionException;
import group29.hust.model.User;
import group29.hust.service.impl.UserService;
import group29.hust.utils.anotation.MessageApi;
import jakarta.validation.Valid;

@RestController
@RequestMapping("${api.prefix}")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
    }

    @PostMapping("/add-user")
    @MessageApi("create new account action")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody User dataUser) throws BadActionException {
        // User accUser = this.userService.handleCreateUser(dataUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.create(dataUser));
    }

    @PutMapping("/update-user")
    @MessageApi("Update user information action")
    public ResponseEntity<UpdateUserDTO> getUpdateUserInfo(@RequestBody User user) throws BadActionException {
        return ResponseEntity.ok(this.userService.update(user));
    }

    @GetMapping("/user/{id}")
    @MessageApi("Get information user action")
    public ResponseEntity<UserDTO> getInfo(@PathVariable("id") long id) throws BadActionException {
        // User accUser = this.userService.handleCreateUser(dataUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.getInfo(id));
    }

    @DeleteMapping("/delete-user/{id}")
    @MessageApi("Delete action")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) throws BadActionException {
        this.userService.delete(id);
        return ResponseEntity.ok(null);
    }

    // get all users
    @GetMapping("/users")
    @MessageApi("Fetch All Users action")
    public ResponseEntity<PaginationResultDTO> getAllUsersInfo(
            @Filter Specification<User> spec, Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.getAll(spec, pageable));
    }
}
