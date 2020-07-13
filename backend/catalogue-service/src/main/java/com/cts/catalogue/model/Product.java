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

package com.cts.catalogue.model;

import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author sridhar.bandi
 */
@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String productCode;
    @Column(nullable = false)
    private String productName;
    @Column(nullable = false)
    private String productImage;
    @Column(nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String productDescription;
    @Column(nullable = false)
    private double productPrice;
    @Column(nullable = false)
    private int productQuantity;
    @Column(nullable = false)
    @Transient
    private boolean inStock = true;
}