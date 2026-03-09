package com.hoanghiep.backendbusbookingsystem.controller.response;

import com.hoanghiep.backendbusbookingsystem.controller.common.Page;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    private T data;
    private Page paging;

}
