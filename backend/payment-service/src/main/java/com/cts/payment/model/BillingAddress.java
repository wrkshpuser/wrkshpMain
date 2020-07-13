package com.cts.payment.model;

import lombok.Data;

@Data
public class BillingAddress {
    String name;
    String street_address;
    String city;
    String state;
    String zip;
}
