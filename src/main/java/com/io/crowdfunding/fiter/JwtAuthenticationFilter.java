package com.io.crowdfunding.fiter;

import com.io.crowdfunding.security.JwtService;
import com.io.crowdfunding.utill.TokenData;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        System.out.println("JWT FILTER HIT");
//        System.out.println(userDetails.getAuthorities());
        System.out.println("Auth Header: " + request.getHeader("Authorization"));
        Optional<String> tokenOpt = jwtService.extractToken(request, "ACCESS");
        System.out.println (tokenOpt);
        if (tokenOpt.isPresent()) {
            String email = jwtService.getTokenData( tokenOpt.get(), TokenData::email );
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            System.out.println(userDetails.getAuthorities());
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken( userDetails, null, userDetails.getAuthorities()   );
            System.out.println (auth);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }
}
