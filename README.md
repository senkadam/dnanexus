# DNANEXUS Test Engineer Challenge

## Problem 1: Quality assurance strategies

### In general, how would you go about testing the correctness of the results provided by this service? What tools or frameworks would you use to automate the testing? At what level(s) of granularity would you test the service, and why?

I would focus on following topics in testing:
* Correct HTTP responses - I would expect correct response codes and data or appropriate error codes and error messages.
* Correct data in responses - First, I would test the format of the response. Then, I would focus on the testing of the data correctness. I would use some testing input and output data. I would also compare service responses to itself. For example I would expect that two responses for [_start_,_end_] parameters being [1,10] and [11,20] will be equal to the response on request with parameters [1,20]
* Performance of the service

As test engineer i would focus on two levels of granularity:
* **integration** testing of the service
* **end to end** testing of components using the service

My toolset would be:
 * [Postman](https://www.getpostman.com/) - manual testing, or semi-manual testing of the service
 * Unit test - for automation of HTTP request response testing - for example javascript unit test library [jest](https://jestjs.io/).
 * [gatling.io](http://www.gatling.io) - for performance test and stress testing
 * Webbrowser - manual end to end testing of components using the service
 * [webdriver.io](http://www.webdriver.io) - automated end to end testing of components using the service

### What are some of the specific test cases you would create? (You do not need to write code; just describe them.) Be sure to consider the handling of both valid and invalid queries.

First, I would test **various datasets**. I would expect:
* OK response for existing datasets, containing response data in correct format.
* ERROR with appropriate error message for not existing datasets.

Second, I would test **various combination of valid begin and end parameter**. I would expect to get:
* OK response for valid _beign_ and _end_ query parameters combination.
* OK response or timeout with valid _beign_ and _end_ query parameters combination, but when asking for large begin end position distance (I would prefer not to get timeout, but depends on specification).


In both previous cases I would test the correctness of response format

Third, I would test **invalid input data formats**. I would expect following results:
* ERROR response and appropriate error message for _end_ and _data_ in wrong format (not numbers).

 * ERROR response and appropriate error message for _end_ and _data_ being smaller than zero.

 * ERROR response and appropriate error message for _end_ and _data_ being are bigger than 4 billion.

 * ERROR response and appropriate error message  OR response with default values (this depends on specification)for _begin_ and _end_ missing. I would expect default values 0 for _begin_ and MAX for _end_.

  * ERROR response and appropriate error message for parameter _begin_ being bigger or equal to _end_ parameter.
 
Fourth, I would test queries with various query parameters, that are not defined in service specification. I would expect that these parameters would not affect the result of the query (OR the response will be ERROR with appropriate error message).


### The performance of the system must be adequate for real-time interactive use. How would you measure the performance (response time) of the service? What factors or parameters might affect response time? Over what range of these parameters would you measure performance?

I would use gatling.io for performance measuring. These tool enables to defines various parameters of HTTP queries. I would focus on following metrics:
 * average response time
 * maximum response time
 * average response time in 99, 95 and 90 percentile

I would also test the performance of the service by end to end test. I would expect that some module is using this service. I would focus on real user experience of users using such modules.

 Parameters that affects performance are:
 * chosen dataset
 * range between _begin_ and _end_

 I would test the performance for various combination of these parameters up to the maximum range (_begin_ = 0; _end_ = 4 000 000 000).


### How would you analyze the scalability of the system? I.e., the way the system responds to increasing load (for example, large numbers of simultaneous queries).

I would measure important parameters of the systems that can be affected by the increasing load:
 * response time - how the response time is affected by the load. I will look at **average** response time, **max** response time, and **average response time in 99, 95 and 90 percentile**
 * timeout rate - how the increasing load affects amount of timeouted requests
 * error rate - how the load affects  the amount of request ending in ERROR state.

Input data could be defined by tester or could be extracted from logs (data extracted from logs would better simulate the real usage of the service).

It is important to test various types of load, when testing the scalability of the system. For example, we can test huge amount of request made at the same time, huge amount of request being made for a time period, some amount of requests that is rising (or failing) during some time period, or combination of previous examples.

 I would use [gatling.io](http://www.gatling.io) for the scalability testing.
   

## Problem 2: DNA sequence conversion
The solution is implemented using node.js v11.0.0.

### Structure of the repository

* **root** - contains npm definition _package.json_, _index.js_ that runs the program and this _README.MD_

* **data** - contains input example and three output examples received by Martin Bednar

* **lib** contains _fastq.js_ module implementing the fastq transformation logic and _fastq.test.js_ file in _test_ subfolder that implements unit tests

### Implementation
* I read chunks of input data. The size of chunk is given by L number.
* I transform all bytes of the chunk into ACGT DNA Letter using bitwise operation shift
 * I transform all bytes of the chunk into quality score bitwise operation AND
 * I print the result in given format

Please read the comments in _fastq.js_ file to learn the details.

### How to run the program

To run the program use following command in root of this repository:

```
npm start path_to_data L_number
```

Example of running comand:
```
npm start ./data/input 80
```

### How to run test

Unit test are implemented by [jest](https://jestjs.io/) library in BDD style.

You have to install all necessary node module by using following npm command:
```
npm install
```

Then you can run the tests using:
```
npm test
```
