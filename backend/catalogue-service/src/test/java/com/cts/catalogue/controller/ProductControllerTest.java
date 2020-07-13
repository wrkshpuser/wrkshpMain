package com.cts.catalogue.controller;

import com.cts.catalogue.model.Product;
import com.cts.catalogue.service.ProductService;
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
@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ProductService service;

    @Test
    public void testAllProducts() throws Exception {
        Product product1 = new Product();
        product1.setProductName("iPhone");

        Product product2 = new Product();
        product2.setProductName("Samsung");

        Product product3 = new Product();
        product3.setProductName("Fitbit");

        List<Product> allProducts = Arrays.asList(product1, product2, product3);

        given(service.findAllProducts()).willReturn(allProducts);

        mvc.perform(get("/product/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].productName", is(product1.getProductName())))
                .andExpect(jsonPath("$[1].productName", is(product2.getProductName())))
                .andExpect(jsonPath("$[2].productName", is(product3.getProductName())));

        verify(service, VerificationModeFactory.times(1)).findAllProducts();
        reset(service);
    }

    @Test
    public void testFifteenProducts() throws Exception {

        Product product1 = new Product();
        product1.setProductName("iPhone");

        Product product2 = new Product();
        product2.setProductName("Samsung");

        Product product3 = new Product();
        product3.setProductName("Fitbit");

        List<Product> allProducts = Arrays.asList(product1, product2, product3);

        given(service.find15Products()).willReturn(allProducts);

        mvc.perform(get("/product/15").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].productName", is(product1.getProductName())))
                .andExpect(jsonPath("$[1].productName", is(product2.getProductName())))
                .andExpect(jsonPath("$[2].productName", is(product3.getProductName())));

        verify(service, VerificationModeFactory.times(1)).find15Products();
        reset(service);
    }

    @Test
    public void testProductSearch() throws Exception {
        String productName = "Apple";
        Product product1 = new Product();
        product1.setProductName("Apple iPhone 6");

        Product product2 = new Product();
        product2.setProductName("Apple iPhone 7");

        List<Product> allProducts = Arrays.asList(product1, product2);

        given(service.searchProducts(productName)).willReturn(allProducts);

        mvc.perform(get("/product/search").contentType(MediaType.APPLICATION_JSON).param("productName", productName))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].productName", is(product1.getProductName())))
                .andExpect(jsonPath("$[1].productName", is(product2.getProductName())));

        verify(service, VerificationModeFactory.times(1)).searchProducts(productName);
        reset(service);
    }

    @Test
    public void testProductByCode() throws Exception {
        String productCode = "code123";
        Product product = new Product();
        product.setProductCode(productCode);
        product.setProductName("Apple iPhone 6");

        given(service.findProductByProductCode(productCode)).willReturn(java.util.Optional.of(product));

        mvc.perform(get("/product/{code}", productCode).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productName", is(product.getProductName())));

        verify(service, VerificationModeFactory.times(1)).findProductByProductCode(productCode);
        reset(service);
    }


    @Test
    public void testInsertProduct() throws Exception {
        Product product = new Product();
        product.setProductName("Apple iPhone 6");

        given(service.insertProduct(Mockito.any())).willReturn(product);

        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        byte[] body = mapper.writeValueAsBytes(product);
        mvc.perform(post("/product").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productName", is(product.getProductName())));

        verify(service, VerificationModeFactory.times(1)).insertProduct(Mockito.any());
        reset(service);
    }
}
