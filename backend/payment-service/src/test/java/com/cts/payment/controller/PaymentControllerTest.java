package com.cts.payment.controller;

import com.cts.payment.model.CreditCard;
import com.cts.payment.model.Payment;
import com.cts.payment.model.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(PaymentController.class)
public class PaymentControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void testPay() throws Exception {
        Payment payment = new Payment();
        CreditCard creditCard = new CreditCard();
        creditCard.setCardNumber("222");
        payment.setCredit_card(creditCard);
        ObjectMapper om = new ObjectMapper();
        String jsonRequest = om.writeValueAsString(payment);
        MvcResult result = mockMvc.perform(post("/payment/pay").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Response response = om.readValue(resultContent, Response.class);
        assertTrue(response.getStatus().equals("OK"));
    }

    @Test
    public void testPayInvalid() throws Exception {
        Payment payment = new Payment();
        CreditCard creditCard = new CreditCard();
        creditCard.setCardNumber("4444333322221111");
        payment.setCredit_card(creditCard);
        ObjectMapper om = new ObjectMapper();
        String jsonRequest = om.writeValueAsString(payment);
        MvcResult result = mockMvc.perform(post("/payment/pay").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isBadRequest()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Response response = om.readValue(resultContent, Response.class);
        assertTrue(response.getStatus().equals("NOT OK"));
    }
}
