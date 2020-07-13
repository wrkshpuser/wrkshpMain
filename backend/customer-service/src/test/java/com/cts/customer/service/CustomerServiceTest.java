package com.cts.customer.service;

import com.cts.customer.model.Customer;
import com.cts.customer.repository.CustomerRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CustomerServiceTest {

    @MockBean
    private CustomerRepository repository;

    @Autowired
    private CustomerService service;

    @Configuration
    @Import(CustomerService.class)
    static class TestConfig {
        @Bean
        CustomerRepository customerRepository() {
            return mock(CustomerRepository.class);
        }
    }
    @Test
    public void testFindAllCustomers() {
        Customer customer1 = new Customer();
        customer1.setFirstName("Sridhar");
        customer1.setLastName("Bandi");

        Customer customer2 = new Customer();
        customer2.setFirstName("John");
        customer2.setLastName("Doe");

        List<Customer> allCustomers = Arrays.asList(customer1, customer2);

        when(repository.findAll()).thenReturn(allCustomers);

        assertEquals(2, service.findAllCustomers().size());
    }

    @Test
    public void testFindCustomerByEmail() {
        Customer customer1 = new Customer();
        customer1.setFirstName("Sridhar");
        customer1.setLastName("Bandi");
        customer1.setEmail("sridhar.bandi@e-shop.com");

        when(service.findCustomerByEmail("sridhar.bandi@e-shop.com")).thenReturn(Optional.of(customer1));

        assertEquals(Optional.of(customer1), service.findCustomerByEmail("sridhar.bandi@e-shop.com"));
    }

    @Test
    public void testCreateCustomer() {
        Customer customer1 = new Customer();
        customer1.setFirstName("Sridhar");
        customer1.setLastName("Bandi");
        customer1.setEmail("sridhar.bandi@e-shop.com");

        when(service.createCustomer(customer1)).thenReturn(customer1);

        assertEquals(customer1, service.createCustomer(customer1));
    }
}
