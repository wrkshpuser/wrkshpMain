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

package com.cts.catalogue.controller;

import com.cts.catalogue.model.Product;
import com.cts.catalogue.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * @author sridhar.bandi
 */
@RestController
@RequestMapping("/product")
@Slf4j
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<Product> allProducts(HttpServletRequest request) {
        log.info("Finding all products");
        String auth_header = request.getHeader("AUTH_HEADER");
        log.info("AUTH_HEADER: "+auth_header);
        return productService.findAllProducts();
    }

    @GetMapping("/15")
    public List<Product> fifteenProducts(HttpServletRequest request) {
        log.info("Finding 15 products");
        String auth_header = request.getHeader("AUTH_HEADER");
        log.info("AUTH_HEADER: "+auth_header);
        return productService.find15Products();
    }

    @GetMapping("/search")
    public List<Product> productSearch(@RequestParam String productName) {
        log.info("Searching for products with name "+ productName);
        return productService.searchProducts(productName);
    }

    @GetMapping("/{code}")
    public Product productByCode(@PathVariable String code) {
        log.info("Finding product by code :"+code);
        return productService.findProductByProductCode(code)
                .orElseThrow(() -> new RuntimeException("Product with code ["+code+"] doesn't exist"));
    }

    @PostMapping("")
    public Product insertProduct(@Valid @RequestBody Product product){
        log.info("Inserting product :" + product);
        return productService.insertProduct(product);
    }

}
