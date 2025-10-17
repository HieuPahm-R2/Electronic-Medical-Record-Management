package group29.hust.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import group29.hust.dtos.response.RestResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = {
            BadActionException.class
    })
    public ResponseEntity<RestResponse<Object>> handleBadActionException(Exception ex) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getMessage());
        res.setMessage("INVALID INPUTS OR EXCEPTION OCCURS...");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

}
