package com.cts.customer.controller;

import com.cts.customer.model.Customer;
import com.cts.customer.service.CustomerService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(CustomerController.class)
public class CustomerControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CustomerService service;

    @Test
    public void testAllCustomers() throws Exception {
        Customer customer1 = new Customer();
        customer1.setFirstName("Sridhar");
        customer1.setLastName("Bandi");

        Customer customer2 = new Customer();
        customer2.setFirstName("John");
        customer2.setLastName("Doe");

        List<Customer> allCustomers = Arrays.asList(customer1, customer2);
        given(service.findAllCustomers()).willReturn(allCustomers);

        mvc.perform(get("/customer/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].firstName", is(customer1.getFirstName())))
                .andExpect(jsonPath("$[0].lastName", is(customer1.getLastName())))
                .andExpect(jsonPath("$[1].firstName", is(customer2.getFirstName())))
                .andExpect(jsonPath("$[1].lastName", is(customer2.getLastName())));

        verify(service, VerificationModeFactory.times(1)).findAllCustomers();
        reset(service);
    }

    @Test
    public void testLogin() throws Exception {
        String email = "sridhar.bandi@e-shop.com";
        Customer customer = new Customer();
        customer.setEmail(email);
        customer.setPassword("uZuNsvvqwPX1e0AtKtAQ");

        given(service.findCustomerByEmail(Mockito.any())).willReturn(Optional.of(customer));

        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        byte[] body = mapper.writeValueAsBytes(customer);

        mvc.perform(post("/customer/login").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk());

        verify(service, VerificationModeFactory.times(1)).findCustomerByEmail(Mockito.any());

        reset(service);
    }

    @Test
    public void testLoginCustomerNotFound() throws Exception {
        Customer customer = new Customer();
        customer.setEmail("john.doe@e-shop.com");
        customer.setPassword("uZuNsvvqwPX1e0AtKtA");

        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        byte[] body = mapper.writeValueAsBytes(customer);

        mvc.perform(post("/customer/login").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isNotFound());

        verify(service, VerificationModeFactory.times(1)).findCustomerByEmail(Mockito.any());

        reset(service);
    }

    @Test
    public void testLoginWrongPassword() throws Exception {
        Customer customer = new Customer();
        customer.setEmail("sridhar.bandi@e-shop.com");
        customer.setPassword("uZuNsvvqwPX1e0AtKtA");

        given(service.findCustomerByEmail(Mockito.any())).willReturn(Optional.of(customer));

        Customer customer1 = new Customer();
        customer1.setEmail("sridhar.bandi@e-shop.com");
        customer1.setPassword("uZuNsvvqwPX1e0AtKtA1");
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        byte[] body = mapper.writeValueAsBytes(customer1);

        mvc.perform(post("/customer/login").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isUnauthorized());

        verify(service, VerificationModeFactory.times(1)).findCustomerByEmail(Mockito.any());

        reset(service);
    }

   @Test
    public void testRegister() throws Exception {
       Customer customer = new Customer();
       customer.setEmail("sridhar.bandi@e-shop.com");
       customer.setPassword("uZuNsvvqwPX1e0AtKtA@#");
       customer.setFirstName("Sridhar");
       customer.setFirstName("Bandi");

       given(service.createCustomer(customer)).willReturn(null);

       ObjectMapper mapper = new ObjectMapper();
       mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
       byte[] body = mapper.writeValueAsBytes(customer);
       mvc.perform(post("/customer/register").contentType(MediaType.APPLICATION_JSON).content(body))
               .andExpect(status().isOk());

       verify(service, VerificationModeFactory.times(1)).createCustomer(Mockito.any());

       reset(service);
    }
}
