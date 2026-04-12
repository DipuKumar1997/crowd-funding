package com.io.crowdfunding.controller;

import com.io.crowdfunding.GlobalResponse.AuthResponse;
import com.io.crowdfunding.GlobalResponse.GlobalResponse;
import com.io.crowdfunding.dto.LoginRequest;
import com.io.crowdfunding.dto.RegisterRequest;
import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.repository.UserRepository;
import com.io.crowdfunding.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private  final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<GlobalResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(request.email(), request.password()) );
        } catch (AuthenticationException ex) {
            // authentication failed (bad credentials, disabled, etc.)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new GlobalResponse<>(false, "Invalid email or password", null));
        }
        Optional<User> optionalUser = userRepository.findByEmail(request.email());
        if (optionalUser.isEmpty()) {
            // user not found — handle gracefully without throwing
            return ResponseEntity.status( HttpStatus.UNAUTHORIZED).body(new GlobalResponse<>(false, "Invalid email or password", null));
        }
        User user = optionalUser.get();
        log.info ( "user logging {}", user );
        String accessToken = jwtService.createToken(user, jwtService::buildAccessToken);
        String refreshToken = jwtService.createToken(user, jwtService::buildRefreshToken);
        AuthResponse auth = new AuthResponse(accessToken, refreshToken,user.getRole ());
        return ResponseEntity.ok(new GlobalResponse<>(true, "login successful", auth));
    }
    @PostMapping("/register")
    public ResponseEntity<GlobalResponse<User>> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())  ) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new GlobalResponse<>(false, "Email already in use", null));
        }
        User user = new User();
        user.setFirstName ( request.firstName () );
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password ()));
        user.setRole("ROLE_USER");
        userRepository.save(user);
        return ResponseEntity .status(HttpStatus.CREATED) .body(new GlobalResponse<>(true, "User registered successfully", user));
    }
}
