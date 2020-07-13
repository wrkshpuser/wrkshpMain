package com.cts.payment.model;

import lombok.Data;

@Data
public class Response {
    String id;
    Props additionalProperties;
    String status;
}
