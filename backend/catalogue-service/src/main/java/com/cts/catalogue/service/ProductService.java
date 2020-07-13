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

package com.cts.catalogue.service;

import com.cts.catalogue.model.Product;
import com.cts.catalogue.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author sridhar.bandi
 */
@Service
@Transactional
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> findProductByProductCode(String code) {
        return productRepository.findByProductCode(code);
    }

    public Product insertProduct(Product product){
        product.setProductCode(UUID.randomUUID().toString().replaceAll("-",""));
        return productRepository.save(product);
    }

    public List<Product> find15Products() {
        return productRepository.findFirst15ByOrderByIdDesc();
    }

    public List<Product> searchProducts(String name) {
        return productRepository.findByProductNameContaining(name);
    }
}
