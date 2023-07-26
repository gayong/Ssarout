package com.ssafy.ssaout.user.service;

import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
