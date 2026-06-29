package com.forum.app.service;

import com.forum.app.entity.Role;
import com.forum.app.entity.User;
import com.forum.app.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(Long id, String username, String email) {
        User user = getUserById(id);

        user.setUsername(username);
        user.setEmail(email);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = getUserById(userId);

        if(!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public String banUser(Long id) {
        User user = getUserById(id);
        user.setRole(Role.BANNED);
        userRepository.save(user);
        try{
            emailService.sendBanEmail(user.getEmail(), user.getUsername());
            return "User banned and email sent";
        }catch(Exception e){
            System.out.println("Email could not be sent: " + e.getMessage());
            return "User banned, but email could not be sent";
        }
    }

    public String unbanUser(Long id) {
        User user = getUserById(id);
        user.setRole(Role.USER);
        userRepository.save(user);
        return "User unbanned";
    }

    public String changeRole(Long id, Role role) {
        User user = getUserById(id);
        user.setRole(role);
        userRepository.save(user);
        return "User updated";
    }
}
