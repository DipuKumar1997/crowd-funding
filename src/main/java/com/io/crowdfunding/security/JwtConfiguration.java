package com.io.crowdfunding.security;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.function.Supplier;

@Configuration
public abstract class JwtConfiguration {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access.expiration}")
    protected long accessTokenExpiration;

    @Value("${jwt.refresh.expiration}")
    protected long refreshTokenExpiration;

    protected Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    protected Supplier<JwtBuilder> jwtBuilderSupplier = () ->
              Jwts.builder() .signWith(getSigningKey()) .issuedAt(new Date(System.currentTimeMillis()));

    //new Date(System.currentTimeMillis()) use the system refresh time
    //new Date () use the cached UTC

    protected JwtParser jwtParser() {
        return Jwts.parser()
                .verifyWith( (SecretKey) getSigningKey() )
                .build();
    }
}