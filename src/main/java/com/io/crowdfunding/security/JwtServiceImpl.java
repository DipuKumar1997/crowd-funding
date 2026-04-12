package com.io.crowdfunding.security;

import com.io.crowdfunding.constant.TokenType;
import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.utill.TokenData;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtServiceImpl extends JwtConfiguration implements JwtService {

    @Override
    public String createToken(User user, Function<TokenData, String> tokenFunction) {
        TokenData tokenData = new TokenData(user.getEmail(), user.getRole());
        return tokenFunction.apply(tokenData);
    }

    @Override
    public String buildAccessToken(TokenData tokenData) {
         System.out.println ("in buildaccesstoken method start ");
        System.out.println("Current Time: " + System.currentTimeMillis());
        System.out.println("Expiration Offset: " + refreshTokenExpiration);
        System.out.println("Token will expire at: " + new Date(System.currentTimeMillis() + refreshTokenExpiration));
         System.out.println ("in buildaccesstoken method end of sout  ");
        System.out.println ("tokendata buildaccesstoken "+ tokenData.role ());
        return jwtBuilderSupplier.get()
                .subject(tokenData.email ())
                .claim("role", tokenData.role ())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .compact();
    }

    @Override
    public String buildRefreshToken(TokenData tokenData) {
        System.out.println ("in buildrefreshToken method start ");
        System.out.println("Current Time: " + System.currentTimeMillis());
        System.out.println("Expiration Offset: " + refreshTokenExpiration);
        System.out.println("Token will expire at: " + new Date(System.currentTimeMillis() + refreshTokenExpiration));
         System.out.println ("in buildrefreshToken method end of sout  ");
        System.out.println ("tokendata rtole "+ tokenData.role ());
        return jwtBuilderSupplier.get()
                .subject(tokenData.email ())
                .claim("role", tokenData.role ())
                .expiration(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .compact();
    }

    @Override
    public Optional<String> extractToken(HttpServletRequest request, String tokenType) {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                return Optional.of(authHeader.substring(7));
            }

        if (request.getCookies() == null) return Optional.empty();
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals(tokenType)) {
                return Optional.of(cookie.getValue());
            }
        }
        return Optional.empty();
    }

    @Override
    public void addCookie(HttpServletResponse response, User user, TokenType type) {
        long expiration = type == TokenType.ACCESS ? accessTokenExpiration : refreshTokenExpiration;
        String token = createToken(user, type == TokenType.ACCESS ? this::buildAccessToken : this::buildRefreshToken );
        Cookie cookie = new Cookie(type.name(), token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (expiration / 1000));
        response.addCookie(cookie);
    }

    @Override
    public <T> T getTokenData(String token, Function<TokenData, T> tokenFunction) {
        Claims claims = jwtParser() .parseSignedClaims(token) .getPayload();
        TokenData tokenData = new TokenData(  claims.getSubject(),  claims.get("role", String.class) );
        return tokenFunction.apply(tokenData);
    }
}

//    @Override
//    public String buildAccessToken(TokenData tokenData) {
//        return jwtBuilderSupplier.get()
//                .setSubject(tokenData.getEmail())
//                .claim("role", tokenData.getRole())
//                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
//                .compact();
//    }


//    public String createToken(User user, Function<TokenData, String> tokenFunction) {
//        TokenData tokenData = new TokenData( user.getEmail(), user.getRole() );
//        return tokenFunction.apply(tokenData);
//    }
//    public String buildAccessToken(TokenData tokenData) {
//        return jwtBuilderSupplier.get() .setSubject(tokenData.email ()) .claim("role", tokenData.role ()) .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration)) .compact();
//    }
//
//    public String buildRefreshToken(TokenData tokenData) {
//        return jwtBuilderSupplier.get()  .setSubject(tokenData.email ())  .claim("role", tokenData.role ()) .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))  .compact();
//    }
//    public Optional<String> extractToken(HttpServletRequest request, String tokenType) {
//         log.info ("-------------------------------"+ request.getPathInfo () );
//        if (request.getCookies() == null) return Optional.empty();
//        for (Cookie cookie : request.getCookies()) { if (cookie.getName().equals(tokenType)) { return Optional.of(cookie.getValue()); } }
//        return Optional.empty();
//    }
//    public void addCookie(HttpServletResponse response, User user, TokenType type) {
//        long expiration = type == TokenType.ACCESS ? accessTokenExpiration : refreshTokenExpiration;
//        JwtBuilder builder = jwtBuilderSupplier.get();
//        String token = builder .setSubject(user.getEmail()) .claim("role", user.getRole()) .setExpiration(new Date(System.currentTimeMillis() + expiration)) .compact();
//        Cookie cookie = new Cookie(type.name(), token);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true); // true in production (HTTPS)
//        cookie.setPath("/");
//        cookie.setMaxAge((int) (expiration / 1000));
//        response.addCookie(cookie);
//    }
//    public <T> T getTokenData(String token, Function<TokenData, T> tokenFunction) {
//        Claims claims = jwtParser().parseClaimsJws(token).getBody();
//        TokenData tokenData = new TokenData( claims.getSubject(), claims.get("role", String.class) );
//        return tokenFunction.apply(tokenData);
//    }