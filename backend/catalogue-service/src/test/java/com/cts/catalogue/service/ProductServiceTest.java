package com.cts.catalogue.service;

import com.cts.catalogue.model.Product;
import com.cts.catalogue.repository.ProductRepository;
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
public class ProductServiceTest {

    @MockBean
    private ProductRepository repository;

    @Autowired
    private ProductService service;

    @Configuration
    @Import(ProductService.class)
    static class TestConfig {
        @Bean
        ProductRepository productRepository() {
            return mock(ProductRepository.class);
        }
    }

    @Test
    public void testFindAllProducts() {
        Product product1 = new Product();
        product1.setProductName("iPhone");

        Product product2 = new Product();
        product2.setProductName("Samsung");

        Product product3 = new Product();
        product3.setProductName("Fitbit");

        List<Product> result = Arrays.asList(product1, product2, product3);
        when(repository.findAll()).thenReturn(result);

        assertEquals(3, service.findAllProducts().size());
    }

   @Test
    public void testFindProductByProductCode() {
       String productCode = "code123";
       Product product = new Product();
       product.setProductCode(productCode);
       product.setProductName("Apple iPhone 6");

        when(repository.findByProductCode(productCode)).thenReturn(Optional.of(product));

        assertEquals(Optional.of(product), service.findProductByProductCode(productCode));
    }

    @Test
    public void testInsertProduct() {
        Product product = new Product();
        product.setProductName("Apple iPhone 6");

        when(repository.save(product)).thenReturn(product);

        assertEquals(product, service.insertProduct(product));
    }

     @Test
    public void testFind15Products() {
         Product product1 = new Product();
         product1.setProductName("iPhone");

         Product product2 = new Product();
         product2.setProductName("Samsung");

         List<Product> fifteenProducts = Arrays.asList(product1, product2);

         when(repository.findFirst15ByOrderByIdDesc()).thenReturn(fifteenProducts);

         assertEquals(2, service.find15Products().size());
    }

    @Test
    public void testSearchProducts() {
        String productName = "Apple";
        Product product1 = new Product();
        product1.setProductName("Apple iPhone 6");

        Product product2 = new Product();
        product2.setProductName("Apple iPhone 7");

        final List<Product> products = Arrays.asList(product1, product2);
        when(repository.findByProductNameContaining(productName)).thenReturn(products);

        assertEquals(2, service.searchProducts(productName).size());
    }
}
