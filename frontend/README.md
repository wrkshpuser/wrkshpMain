## Application Overview:CTS-SHOP
    # This is a Sample ECOMMERCE Resonsive Web Designed Application built using React, in which we can perform Basic Ecommerce Functionalities like 
                - Registration
                - Login
                - Searching a Product
                - Adding To Bag
                - Enter Delivery Details
                - Checkout
                - Payment
    # UI Will be rendered based on the responses from Microservices. 3 Microservices are available
                - Catalogues and Products <Helps with Product searches>
                - Customer - Registration and Login
                - Image Services
    # Data will be rendered from SQL Server database.
    # Payment will be processsed though Mockservies for Payment.
    # Considering the fact of API Unavailablity - suppose if Microservices is not available - Mock services developed using Express JS can be leverage to Render the UI application for test. All the micro services are mocked and available within the UI Framework for consumption.

## Technology Stack:-
    -Front End: ReactJS
        - Unit Testcases: Jest, Enzyme
    -Mock Services: Express JS
    -Back End: Micro services using Spring Boot <Available at Repo :- >
    -DataBase: SQL Server

## Basic commands to start up with CTS-SHOP Front End
    ## Before starting
    - Install Node.js
    ## To Install Packages
    - npm install 
    ## To Start UI
    - npm start 
    ## To Execute Mock Services (If Microservices are Not Aavailable we can use this)
    - npm run mock
    ## To Execute Unit Test.
    - npm test


# Docker related

    ## Run the follwing command to create the docker file:

    - docker build ./ -t awswrkshpaut:frontend -t awswrkshpaut:latest -t awswrkshpaut:1.0

    ## Run the following command to run the docker file:
    - 
        docker run \
        -it \
        --rm \
        -v ${PWD}:/app \
        -v /app/node_modules \
        -p 3001:3000 \
        -e CHOKIDAR_USEPOLLING=true \
        awswrkshpaut:frontend