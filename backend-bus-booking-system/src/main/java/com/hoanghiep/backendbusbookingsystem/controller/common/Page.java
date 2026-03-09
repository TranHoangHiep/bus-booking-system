package com.hoanghiep.backendbusbookingsystem.controller.common;

import lombok.*;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Page {
    private int pageIndex;
    private int pageSize;
    private long totalElements;

    public static Page fromPage(org.springframework.data.domain.Page page) {
        return Page.builder()
                .pageIndex(page.getNumber())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .build();
    }
}
