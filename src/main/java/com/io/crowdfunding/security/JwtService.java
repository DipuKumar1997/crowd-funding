package com.io.crowdfunding.security;

import com.io.crowdfunding.constant.TokenType;
import com.io.crowdfunding.entity.User;
import com.io.crowdfunding.utill.TokenData;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.function.Function;

public interface JwtService {
    String createToken(User user, Function<TokenData, String> tokenFunction);
    String buildAccessToken(TokenData tokenData);
    String buildRefreshToken(TokenData tokenData);
    Optional<String> extractToken(HttpServletRequest request, String tokenType);
    void addCookie(HttpServletResponse response, User user, TokenType type);
    <T> T getTokenData(String token, Function<TokenData, T> tokenFunction);
}