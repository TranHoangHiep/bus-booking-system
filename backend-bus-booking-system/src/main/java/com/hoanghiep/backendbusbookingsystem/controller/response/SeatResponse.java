package com.hoanghiep.backendbusbookingsystem.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@Builder
public class SeatResponse {

    private Long id;
    private Integer price;
    private Integer totalSeat;
    private String bookedSeats;

    private LocalDateTime createdTimestamp;
    private LocalDateTime lastUpdatedTimestamp;
}
