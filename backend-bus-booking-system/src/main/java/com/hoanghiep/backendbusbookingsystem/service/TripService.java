package com.hoanghiep.backendbusbookingsystem.service;

import com.hoanghiep.backendbusbookingsystem.controller.request.TripSearchRequest;
import com.hoanghiep.backendbusbookingsystem.controller.response.PageResponse;
import com.hoanghiep.backendbusbookingsystem.controller.response.SeatResponse;
import com.hoanghiep.backendbusbookingsystem.controller.response.TripSearchResponse;
import com.hoanghiep.backendbusbookingsystem.entity.TripEntity;
import com.hoanghiep.backendbusbookingsystem.entity.TripEntity_;
import com.hoanghiep.backendbusbookingsystem.repository.SeatRepository;
import com.hoanghiep.backendbusbookingsystem.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TripService {

    private final TripRepository tripRepository;

    private final SeatRepository seatRepository;

    public PageResponse<List<TripSearchResponse>> searchTrip(TripSearchRequest tripSearchRequest) {
        Specification<TripEntity> specification = toSpecification(tripSearchRequest);
        Pageable pageable;
        var pageReq = tripSearchRequest.getPaging();
        if (pageReq != null) {
            pageable = PageRequest.of(pageReq.getPageIndex(), pageReq.getPageSize(),
                    Sort.by(Sort.Direction.ASC, "departureTime"));
        } else {
            pageable = PageRequest.of(0, 10,
                    Sort.by(Sort.Direction.ASC, "departureTime"));
        }

        Page<TripEntity> tripEntityPage = tripRepository.findAll(specification, pageable);

        PageResponse<List<TripSearchResponse>> pageResponse = new PageResponse<>();
        pageResponse.setPaging(com.hoanghiep.backendbusbookingsystem.controller.common.Page.fromPage(tripEntityPage));
        pageResponse.setData(tripEntityPage.getContent().stream().map(TripSearchResponse::from).toList());

        return pageResponse;
    }

    public SeatResponse getSeatByTripId(Long tripId) {
        var seatEntity = seatRepository.findByTripId(tripId);
        return SeatResponse.builder()
                .id(seatEntity.getId())
                .price(seatEntity.getPrice())
                .totalSeat(seatEntity.getTotalSeat())
                .bookedSeats(seatEntity.getBookedSeats())
                .createdTimestamp(seatEntity.getCreatedTimestamp())
                .lastUpdatedTimestamp(seatEntity.getLastUpdatedTimestamp())
                .build();
    }

    private Specification<TripEntity> toSpecification(TripSearchRequest request) {
        Specification<TripEntity> specification = (_, _, _) -> null;
        specification = specification.and((root, _, criteriaBuilder) ->
                criteriaBuilder.equal(root.get(TripEntity_.departure), request.getDeparture()));

        specification = specification.and((root, _, criteriaBuilder) ->
                criteriaBuilder.equal(root.get(TripEntity_.destination), request.getDestination()));

        if (request.getDay() != null) {
            specification = specification.and((root, _, criteriaBuilder) ->
                    criteriaBuilder.greaterThan(root.get(TripEntity_.departureTime), request.getDay().atTime(0, 0, 0)));
        }

        return specification;

    }

}
