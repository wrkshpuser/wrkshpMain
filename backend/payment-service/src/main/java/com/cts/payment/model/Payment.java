package com.cts.payment.model;

import lombok.Data;

@Data
public class Payment {

    int amount;
    CreditCard credit_card;
    BillingAddress billing_address;
}
