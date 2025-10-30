package group29.hust.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import group29.hust.dtos.request.RegisterDTO;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import group29.hust.exception.BadActionException;
import group29.hust.dtos.response.PaginationResultDTO;
import group29.hust.dtos.UpdateUserDTO;
import group29.hust.dtos.UserDTO;
import group29.hust.model.Role;
import group29.hust.model.User;
import group29.hust.repository.RoleRepository;
import group29.hust.repository.UserRepository;
import group29.hust.service.IUserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    public RegisterDTO create(User data) throws BadActionException {
        if (this.userRepository.existsByEmail(data.getEmail())) {
            throw new BadActionException("Email đã được sử dụng, hãy thử email khác!");
        }
        if (data.getRole() != null) {
            Optional<Role> res = this.roleRepository.findById(data.getRole().getId());
            data.setRole(res.orElse(null));
        }
        String hashPassword = this.passwordEncoder.encode(data.getPassword());
        data.setPassword(hashPassword);
        this.userRepository.save(data);
        return this.modelMapper.map(data, RegisterDTO.class);
    }

    @Override
    public UserDTO getInfo(Long id) {
        return modelMapper.map(this.userRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Not Found!")), UserDTO.class);
    }

    @Override
    public PaginationResultDTO getAll(Specification<User> spec, Pageable pageable) {
        Page<User> pageCheck = this.userRepository.findAll(spec, pageable);
        PaginationResultDTO res = new PaginationResultDTO();
        PaginationResultDTO.Meta mt = new PaginationResultDTO.Meta();
        mt.setPage(pageCheck.getNumber() + 1);
        mt.setPageSize(pageCheck.getSize());
        mt.setPages(pageCheck.getTotalPages());
        mt.setTotal(pageCheck.getTotalElements());
        res.setMeta(mt);
        // remove sensitive data
        List<UserDTO> listUser = pageCheck.getContent()
                .stream().map(item -> this.modelMapper.map(item, UserDTO.class))
                .collect(Collectors.toList());
        res.setResult(listUser);
        return res;
    }

    @Override
    public void delete(Long id) throws BadActionException {
        Optional<User> currentUser = this.userRepository.findById(id);
        if (!currentUser.isPresent()) {
            throw new BadActionException("Not Found");
        }
        this.userRepository.deleteById(id);
    }

    @Override
    public UpdateUserDTO update(User data) throws BadActionException {
        Optional<User> currentUser = this.userRepository.findById(data.getId());
        if (!currentUser.isPresent()) {
            throw new BadActionException("Not Found");
        }
        currentUser.get().setUsername(data.getUsername());
        currentUser.get().setEmail(data.getEmail());
        if (data.getRole() != null) {
            Optional<Role> res = this.roleRepository.findById(data.getRole().getId());
            currentUser.get().setRole(res.isPresent() ? res.get() : null);
        }
        this.userRepository.save(currentUser.get());
        return modelMapper.map(currentUser.get(), UpdateUserDTO.class);
    }

    @Override
    public User handleGetUserByUsername(String username) {
        return this.userRepository.findByEmail(username);
    }

    @Override
    public User fetchWithTokenAndEmail(String token, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(token, email);
    }

    @Override
    public void saveRefreshToken(String token, String email) {
        User currentUser = this.handleGetUserByUsername(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(token);
            this.userRepository.save(currentUser);
        }
    }

}
