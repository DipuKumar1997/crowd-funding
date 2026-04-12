package com.io.crowdfunding.exceptionHandler;

public class ResourceNotFoundException extends  RuntimeException{
    public  ResourceNotFoundException(String message){
        super(message);
    }
}