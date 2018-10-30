# DNANEXUS Test Engineer Challenge

## Problem 1: Quality assurance strategies

### In general, how would you go about testing the correctness of the results provided by this service? What tools or frameworks would you use to automate the testing? At what level(s) of granularity would you test the service, and why?

In testing i would focus on following topics:
 * 
 
 My toolset would be:
  * Postman - 
  * Unit test - 
  * Gatling

### What are some of the specific test cases you would create? (You do not need to write code; just describe them.) Be sure to consider the handling of both valid and invalid queries.

Firts, I would test **various datasets**. I would expect:
 * OK response for existing datasets 
 * error with propriate error message for not existing datasets.

Second, I would test **various combination of begin and end parameter**. I would expect to get:
 * OK response 
 * OK response or timeout with
 * Error when

In both previous case I would test the correctnes of response format


### The performance of the system must be adequate for real-time interactive use. How would you measure the performance (response time) of the service? What factors or parameters might affect response time? Over what range of these parameters would you measure performance?

### How would you analyze the scalability of the system? I.e., the way the system responds to increasing load (for example, large numbers of simultaneous queries).

 I would measure important parameters of the systems that can be affected by the increasing load:
  * response time
  * error rate
  
 Input data
 
 Load scenarios
 
 Tool
     
     

## Problem 2: DNA sequence conversion
The solution is implemented using node.js v11.0.0.

### Structure of the repository

* **root** - contains npm definiton _package.json_, _index.js_ that runs the program and this _README.MD_

* **data** - contains input example and three output examples recieved by Martin Bednar
 
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

You have to install all neccesary node module by using following npm command:
```
npm install
```

Then you can run the tests using:
```
npm test
```
