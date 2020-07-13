package com.cts.payment.model;

import lombok.Data;

@Data
public class CreditCard {
    String cardNumber;
    String cvv;
    String expiration_month;
    String expiration_year;
}
