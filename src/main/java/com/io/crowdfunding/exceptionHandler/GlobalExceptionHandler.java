package com.io.crowdfunding.exceptionHandler;

import com.io.crowdfunding.GlobalResponse.GlobalResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // Handle specific exception
    //    @ExceptionHandler(ResourceNotFoundException.class)
    //    public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
    //        return ResponseEntity .status(HttpStatus.NOT_FOUND) .body(ex.getMessage());
    //    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        ApiError error = new ApiError( 404, ex.getMessage(), request.getRequestURI(), System.currentTimeMillis() );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    // dle Illegal Argument
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity .status(HttpStatus.BAD_REQUEST) .body(ex.getMessage());
    }

    // Handle validation errors (@Valid)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<String> handleValidation(MethodArgumentNotValidException ex) {
//        String error = ex.getBindingResult()  .getFieldError() .getDefaultMessage();
//        return ResponseEntity  .status(HttpStatus.BAD_REQUEST).body(error);
//    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(  MethodArgumentNotValidException ex, HttpServletRequest request) {
        String msg = ex.getBindingResult().getFieldError() .getDefaultMessage();
        ApiError error = new ApiError( 400, msg, request.getRequestURI(), System.currentTimeMillis() );
        return ResponseEntity.badRequest().body(error);
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleAll(Exception ex) {
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body("Something went wrong");
//    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneric( Exception ex,HttpServletRequest request) {
        log.error("Unexpected error", ex);
        ApiError error = new ApiError( 500, "Internal server error", request.getRequestURI(), System.currentTimeMillis() );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) .body(error);
    }
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<GlobalResponse<Void>> handleUsernameNotFound(UsernameNotFoundException ex, HttpServletRequest request) {
        GlobalResponse<Void> body = new GlobalResponse<>(false, ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }
}
