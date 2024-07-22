package com.example.salesystematthestore.controller;

import com.example.salesystematthestore.payload.ResponseData;
import com.example.salesystematthestore.service.imp.CounterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/counter")
public class CounterController {

    private final CounterServiceImp counterServiceImp;

    @Autowired
    public CounterController(CounterServiceImp counterServiceImp) {
        this.counterServiceImp = counterServiceImp;
    }

    @GetMapping
    public ResponseEntity<?> showAllCounter() {
        ResponseData responseData = new ResponseData();
        responseData.setData(counterServiceImp.showAllCounter());

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(counterServiceImp.getCounterById(id));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/get-by-not-id")
    public ResponseEntity<?> GetByNotId(@RequestParam int counterId) {
        ResponseData responseData = new ResponseData();
        responseData.setData(counterServiceImp.GetByNotId(counterId));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
