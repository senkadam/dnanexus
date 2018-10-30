/**
 * Created by ejdy on 30.10.18.
 */
const fastq = require('./../fastq');
const fs = require('fs');






describe('DNA NEXUS PROGRAMING CHALENGA - UNIT TEST', () => {
    describe('toASCII test', () => {
        it('returns A for byte starting with 00 - 00000000', () => {
            const inputByte = 0b00000000;
            const output = 'A';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns A for byte starting with 00 - 00111111', () => {
            const inputByte = 0b00111111;
            const output = 'A';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns A for byte starting with 00 - 00100111', () => {
            const inputByte = 0b00100111;
            const output = 'A';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });

        it('returns C for byte starting with 00 - 01000000', () => {
            const inputByte = 0b01000000;
            const output = 'C';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns C for byte starting with 00 - 01111111', () => {
            const inputByte = 0b01111111;
            const output = 'C';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns C for byte starting with 00 - 01100100', () => {
            const inputByte = 0b01100100;
            const output = 'C';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns G for byte starting with 00 - 10000000', () => {
            const inputByte = 0b10000000;
            const output = 'G';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns G for byte starting with 00 - 10111111', () => {
            const inputByte = 0b10111111;
            const output = 'G';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns G for byte starting with 00 - 10100110', () => {
            const inputByte = 0b10100110;
            const output = 'G';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns T for byte starting with 00 - 11000000', () => {
            const inputByte = 0b11000000;
            const output = 'T';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns T for byte starting with 00 - 11111111', () => {
            const inputByte = 0b11111111;
            const output = 'T';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
        it('returns T for byte starting with 00 - 11100010', () => {
            const inputByte = 0b11100010;
            const output = 'T';
            expect(fastq.getGenomeChar(inputByte)).toEqual(output);

        });
    });
    describe('getQualityScoreChar test', () => {
        it('returns ! for byte ending with 000000 - 00000000', () => {
            const inputByte = 0b00000000;
            const output = '!';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });
        it('returns ! for byte ending with 000000 - 11000000', () => {
            const inputByte = 0b11000000;
            const output = '!';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });
        it('returns A for byte ending with 100000 - 10100000', () => {
            const inputByte = 0b10100000;
            const output = 'A';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });

        it('returns A for byte ending with 100000 - 01100000', () => {
            const inputByte = 0b01100000;
            const output = 'A';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });
        it('returns " for byte ending with 000001 - 00000001', () => {
            const inputByte = 0b00000001;
            const output = '"';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });
        it('returns " for byte ending with 000001 - 11000001', () => {
            const inputByte = 0b11000001;
            const output = '"';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });
        it('returns ` for byte ending with 100000 - 10111111', () => {
            const inputByte = 0b10111111;
            const output = '`';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });

        it('returns ` for byte ending with 100000 - 01111111', () => {
            const inputByte = 0b01111111;
            const output = '`';
            expect(fastq.getQualityScoreChar(inputByte)).toEqual(output);

        });
    });
    describe('generateFASTQLines test', () => {
        it('returns correct string for chunk of 2 bytes length', () => {
            const vals = [
                0b11111111,
                0b00000000,
            ];
            const chunk = {values: () => vals};
            const output = '@READ_3\nTA\n+READ_3\n`!\n';
            expect(fastq.generateFASTQLines(chunk, 3)).toEqual(output);

        });

        it('returns correct string for chunk of 4 bytes length', () => {
            const vals = [
                0b11111110,
                0b01100001,
                0b00000000,
                0b10100100,
            ];
            const chunk = {values: () => vals};
            const output = '@READ_8\nTCAG\n+READ_8\n_B!E\n';
            expect(fastq.generateFASTQLines(chunk, 8)).toEqual(output);

        });
    });
    describe('generateFASTQ test', () => {

        class myOutputMockStream {

            constructor(expectedRes) {
                this.res = '';
            }

            write(chunk) {
                this.res += chunk;
            }

            get res() {
                return this._res;
            }

            set res(value) {
                this._res = value;
            }

        }
        it('returns string equal to output7 file in data folder', () => {
            const outStream = new  myOutputMockStream();
            const expectedRes = fs.readFileSync('./data/output7').toString('utf-8');
            return fastq.generateFASTQ(fs.createReadStream('./data/input'),7, outStream).then(() => expect(outStream.res).toEqual(expectedRes));
        });
        it('returns string equal to output15 file in data folder', () => {
            const outStream = new  myOutputMockStream();
            const expectedRes = fs.readFileSync('./data/output15').toString('utf-8');
            return fastq.generateFASTQ(fs.createReadStream('./data/input'),15, outStream).then(() => expect(outStream.res).toEqual(expectedRes));
        });
        it('returns string equal to output80 file in data folder', () => {
            const outStream = new  myOutputMockStream();
            const expectedRes = fs.readFileSync('./data/output80').toString('utf-8');
            return fastq.generateFASTQ(fs.createReadStream('./data/input'),80, outStream).then(() => expect(outStream.res).toEqual(expectedRes));
        });
    });
});