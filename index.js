/**
 * Created by ejdy on 29.10.18.
 */
const fs = require('fs');
const fastq = require('./lib/fastq');

/**
 * Parses the input from comandline
 */
const parseInput = (input) => {
    const parsedInput = {};
    try {
        if (!fs.existsSync(input[2])) {
            throw Error('FILE DOES NOT EXISTS');
        }
        parsedInput.rr = fs.createReadStream(input[2]);
        parsedInput.rr.on('error', (err) => {
            console.error('PROBLEM WHEN READING FILE - INVALID PATH');
            throw err;
        });
    } catch (err) {
        console.error('PROBLEM WHEN OPENING FILE - INVALID PATH');
        throw err;
    }
    try {
        parsedInput.chunkSize = parseInt(input[3], 10);
        if(isNaN(parsedInput.chunkSize)) {
            throw Error('CHUNK SIZE IS NOT A NUMBER');
        }
    } catch (err) {
        console.error('PROBLEM WHEN PARSING CHUNK SIZE');
        throw err;
    }
    return parsedInput;
};




const parsedInput = parseInput(process.argv);

//calls FASTQ generator
fastq.generateFASTQ(parsedInput.rr, parsedInput.chunkSize, process.stdout);