# Backend microservices for cts-shop
This is a multi module [gradle](https://gradle.org/) project:

 1. [cataloge-service](/catalogue-service)
 2. [customer-service](/customer-service)
 3. [image-service](/image-service)
 4. [payment-service](/payment-service)
 5. [service-registry](/service-registry)

## Pre-reqs
1. Java 8 or above [download](https://www.oracle.com/java/technologies/javase-downloads.html)
2. git (*optional*)

## Getting started
Download or clone the project : **`https://git-codecommit.us-west-2.amazonaws.com/v1/repos/awswrkshp-aut-backend`**

## Running unit tests with code coverage
For code coverage [Jacoco](https://www.eclemma.org/jacoco/) is been used.

Execute the below command in the project root directory.
```
./gradlew clean codeCoverageReport
```
This will generate code coverage html report at **`./build/reports/jacoco/codeCoverageReport/html`** with **`index.html`** as main file

## Running unit tests and publishing results to Sonarqube

Execute the below command in the project root directory.
```
./gradlew clean codeCoverageReport sonarqube
```
This will publish the results to sonarqube server.
>Note: Change the sonarqube host url in **`build.gradle`** file

## Build the project
Execute the below command in the project root directory to generate the individual executables/jars for each service.
```
./gradlew bootJar
```
This will generate executable jars for each service at **`<serivce-name>/build/libs/<service-name>-1.0.jar`**

## Running the project

### Running all the services with single command(*Not Recommended*)
Execute the below command in the project root directory.
```
./gradlew bootRun --parallel
```

This will run all the services and service registry discovers all the running services, below are the defaults ports each service listens to:

service | port
----|-----
service-registry | 8180
catalogue-service | 8181
customer-service | 8182
image-service | 8183
payment-service | 8184

### Running each service separately(*Recommended*)

**Important: service-registry service has to be executed first as it has to register all other services**
> Note: Its required to `build the project` as mentioned above

Execute the below commands to run each service:
```
java -jar <path of service>/<service-name>-1.0.jar
```

By default, above command will use **dev** configuration.

Pass the environment variable `spring.profiles.active=<configname>` to point to the different configuration(**test** and **prod** are currently available configurations).
```
java -jar -Dspring.profiles.active=prod <path of service>/<service-name>-1.0.jar
```

(*Optional*)Launch eureka[http://localhost:8180/](http://localhost:8180/) to make sure all services are registered and running.

### Swagger documentation

After running the services as mentioned above, swagger specifications can be accessed at `<service-url>/swagger-ui.html`. Below are the urls:

service | swagger url
----|-----
Catalogue | [http://localhost:8181/swagger-ui.html](http://localhost:8181/swagger-ui.html)
Customer | [http://localhost:8182/swagger-ui.html](http://localhost:8182/swagger-ui.html)
Payment | [http://localhost:8184/swagger-ui.html](http://localhost:8184/swagger-ui.html)
