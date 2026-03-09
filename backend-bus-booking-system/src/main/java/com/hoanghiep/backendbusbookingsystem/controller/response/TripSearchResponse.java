package com.hoanghiep.backendbusbookingsystem.controller.response;

import com.hoanghiep.backendbusbookingsystem.entity.TripEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class TripSearchResponse {
    private Long id;
    private String departure;
    private String destination;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private Integer price;
    private Integer availableSeats;

    public static TripSearchResponse from(TripEntity tripEntity){
        return TripSearchResponse.builder()
                .id(tripEntity.getId())
                .departure(tripEntity.getDeparture())
                .destination(tripEntity.getDestination())
                .departureTime(tripEntity.getDepartureTime())
                .arrivalTime(tripEntity.getArrivalTime())
                .availableSeats(tripEntity.getSeats().size())
                .price(tripEntity.getSeats().get(0).getPrice())
                .build();
    }

}
