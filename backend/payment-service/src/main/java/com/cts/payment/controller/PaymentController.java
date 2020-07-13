package com.cts.payment.controller;

import com.cts.payment.model.Payment;
import com.cts.payment.model.Props;
import com.cts.payment.model.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/payment")
@Slf4j
public class PaymentController {

    @PostMapping("/pay")
    public ResponseEntity pay(@Valid @RequestBody Payment payment) {
        boolean isFakeCard = payment.getCredit_card().getCardNumber().equals("4444333322221111");
        Response response = new Response();
        response.setId(UUID.randomUUID().toString());
        response.setStatus(isFakeCard?"NOT OK":"OK");
        Props props = new Props();
        props.setResult(isFakeCard?"Transaction Failed":"Transaction Success");
        props.setIsTestMode("true");
        response.setAdditionalProperties(props);
        return isFakeCard?ResponseEntity.badRequest().body(response):ResponseEntity.ok(response);
    }
}
