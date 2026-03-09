package com.hoanghiep.backendbusbookingsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "seat", indexes = {
        @Index(name = "idx_seat_trip_id", columnList = "trip_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Integer price;

    @Column(name = "total_seat")
    private Integer totalSeat;

    @Column(name = "total_booked_seats")
    private Integer totalBookedSeats;

    @Column(name = "booked_seats")
    private Integer bookedSeats;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false, foreignKey = @ForeignKey(name = "fk_seat_trip"))
    private TripEntity trip;

    @Column(name = "created_timestamp", updatable = false, insertable = false)
    private LocalDateTime createdTimestamp;

    @Column(name = "last_updated_timestamp", insertable = false)
    private LocalDateTime lastUpdatedTimestamp;
}
