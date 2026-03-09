package com.hoanghiep.backendbusbookingsystem.controller;

import com.hoanghiep.backendbusbookingsystem.controller.request.TripSearchRequest;
import com.hoanghiep.backendbusbookingsystem.controller.response.PageResponse;
import com.hoanghiep.backendbusbookingsystem.controller.response.TripSearchResponse;
import com.hoanghiep.backendbusbookingsystem.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bus-booking/api/v1/trips")
@AllArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PageResponse<List<TripSearchResponse>>> searchTrip(@RequestBody TripSearchRequest tripSearchRequest) {
        PageResponse<List<TripSearchResponse>> response = tripService.searchTrip(tripSearchRequest);


        return ResponseEntity.ok(response);
    }
}
