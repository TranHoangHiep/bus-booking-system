package com.hoanghiep.backendbusbookingsystem.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequest {
    @JsonProperty("page_index")
    private int pageIndex = 0;
    @JsonProperty("page_size")
    private int pageSize = 10;
}

