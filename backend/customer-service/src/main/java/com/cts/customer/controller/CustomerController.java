/*
 * Copyright (c) 2019 Cognizant Technology Solutions.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.cts.customer.controller;

import com.cts.customer.exception.CustomerNotFoundException;
import com.cts.customer.model.Customer;
import com.cts.customer.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * @author sridhar.bandi
 */
@RestController
@RequestMapping("/customer")
@Slf4j
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/all")
    public List<Customer> allCustomers(HttpServletRequest request) {
        log.info("Finding all customers");
        String auth_header = request.getHeader("AUTH_HEADER");
        log.info("AUTH_HEADER: " + auth_header);
        return customerService.findAllCustomers();
    }

    @PostMapping("/login")
    public ResponseEntity login( @RequestBody Customer customer) {
        String email = customer.getEmail();
        String password = customer.getPassword().trim();
        Customer storedCustomer = customerService.findCustomerByEmail(email.trim()).orElseThrow(() -> new CustomerNotFoundException("Customer not found with email " + email));
        if (!storedCustomer.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong Password");
        } else {
            return ResponseEntity.ok(storedCustomer);
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody Customer customer) {
        String email = customer.getEmail().trim();
        boolean isPresent = customerService.findCustomerByEmail(email.trim()).isPresent();
        if (isPresent) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Already user present with email "+customer.getEmail());
        } else {
            customerService.createCustomer(customer);
            return ResponseEntity.ok("User Registered");
        }
    }

}
