package com.io.crowdfunding.service;

import com.io.crowdfunding.entity.User;

public interface UserService {
//    User findByUsername(String username);
    User findByEmail(String email);
//    User save(UserDto userDto);
}