package com.hoanghiep.backendbusbookingsystem.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TripSearchRequest {

    @NotNull(message = "Departure is required")
    private String departure;
    @NotNull(message = "Destination is required")
    private String destination;

    @NotNull(message = "Day is required")
    private LocalDate day;
    private Integer seats;
    private PageRequest paging;

}

