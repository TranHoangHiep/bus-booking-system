package com.hoanghiep.backendbusbookingsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "trip", indexes = {
        @Index(name = "idx_trip_departure_time", columnList = "departure_time")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "departure", nullable = false)
    private String departure;

    @Column(name = "destination", nullable = false)
    private String destination;

    @Column(name = "departure_time")
    private LocalDateTime departureTime;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    @Column(name = "created_timestamp", updatable = false, insertable = false)
    private LocalDateTime createdTimestamp;

    @Column(name = "last_updated_timestamp", insertable = false)
    private LocalDateTime lastUpdatedTimestamp;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SeatEntity> seats;
}
