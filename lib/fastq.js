/**
 * Created by ejdy on 30.10.18.
 */

/**
 * @param chunk - chunk of L bytes.
 * @param index - index of chunk
 *
 * The function iterates over all L bytes in chunk and create string representing
 * FASTQ format
 **/
module.exports.generateFASTQLines = (chunk, index) => {
    const genomes = [];
    const qualityScores = [];

    // iteration over all chunks
    for (let b of chunk.values()) {
        //pushing to array of genome codes
        genomes.push(module.exports.getGenomeChar(b));
        // pushing to array of quaity scores
        qualityScores.push(module.exports.getQualityScoreChar(b));
    }

    //transformation of arrays into four line FASTQ string
    return `@READ_${index}${'\n'}${genomes.reduce((a,v) => a+v, '')}${'\n'}+READ_${index}${'\n'}${qualityScores.reduce((a,v) => a+v, '')}${'\n'}`;
};


/**
 * @param b - Input of the function is single byte.
 * b is shifted by  6 bites to the right. First two bites become
 * last two bitex and represents number in range from 0 to 3 that is
 * used as an index in ACGT array.
 **/
module.exports.getGenomeChar = (b) => ['A','C','G','T'][(b >> 6)];


/**
 * @param b - Input of the function is single byte.
 * b is masked by 00111111. Last 6 bites represents ASCII character by adiing 33
 **/
module.exports.getQualityScoreChar = (b) => String.fromCharCode((b  & 0b00111111)+33);


module.exports.generateFASTQ = (inputStream, chunkSize, outputStream) => {
    return new Promise((resolve, reject) => {
        inputStream.on('readable', () => {
            let data;
            let index = 0;
            while (data = inputStream.read(chunkSize)) {
                index++;
                outputStream.write(module.exports.generateFASTQLines(data, index));
            }

            resolve(outputStream);
        });
    });
};