package com.io.crowdfunding.GlobalResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GlobalResponse <T>{
    private  boolean success;
    private  String message;
    private   T data;
}
