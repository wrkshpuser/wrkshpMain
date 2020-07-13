package com.cts.customer;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.boot.SpringApplication;

import static org.powermock.api.mockito.PowerMockito.mockStatic;

@RunWith(PowerMockRunner.class)
public class CustomerServiceApplicationTest {

    @Test
    @PrepareForTest(SpringApplication.class)
    public void testMain() {
        mockStatic(SpringApplication.class);
        // Run the test
        CustomerServiceApplication.main(new String[0]);
        // start verifying behavior
        PowerMockito.verifyStatic(SpringApplication.class);
        // call the static method you want to verify
        SpringApplication.run(CustomerServiceApplication.class, new String[0]);
    }
}
