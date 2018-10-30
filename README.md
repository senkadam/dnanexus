# DNANEXUS Test Engineer Challenge


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
