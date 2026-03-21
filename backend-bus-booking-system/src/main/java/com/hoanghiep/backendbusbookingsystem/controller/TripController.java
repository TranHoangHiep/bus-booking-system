package com.hoanghiep.backendbusbookingsystem.controller;

import com.hoanghiep.backendbusbookingsystem.controller.request.TripSearchRequest;
import com.hoanghiep.backendbusbookingsystem.controller.response.PageResponse;
import com.hoanghiep.backendbusbookingsystem.controller.response.SeatResponse;
import com.hoanghiep.backendbusbookingsystem.controller.response.TripSearchResponse;
import com.hoanghiep.backendbusbookingsystem.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value = "/{tripId}/seats", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SeatResponse> getSeatByTripId(@PathVariable Long tripId) {
        SeatResponse response = tripService.getSeatByTripId(tripId);
        return ResponseEntity.ok(response);
    }

}
