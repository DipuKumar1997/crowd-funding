package com.io.crowdfunding.service.impl;

import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.exceptionHandler.ResourceNotFoundException;
import com.io.crowdfunding.repository.UserRepository;
import com.io.crowdfunding.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
//    @Override
//    public User findByUsername(String username) {
//        return userRepository.find
//    }
    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

}
