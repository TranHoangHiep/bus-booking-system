package com.hoanghiep.backendbusbookingsystem.repository;

import com.hoanghiep.backendbusbookingsystem.entity.SeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepository extends JpaRepository<SeatEntity, Long>, JpaSpecificationExecutor<SeatEntity> {
    SeatEntity findByTripId(Long tripId);
}
