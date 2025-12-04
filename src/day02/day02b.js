import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input);

    const invalidRegex = new RegExp("^(\\d+)\\1+$");
    const ranges = _.split(inputLines[0], ',');
    const invalid = [];
    _.forEach(ranges, range => {
        // console.log('range', range)
        const rangeSplit = _.split(range, '-');
        const val1 = BigInt(rangeSplit[0]);
        const val2 = BigInt(rangeSplit[1]);

        for (let i = val1; i <= val2; i++) {
            if (invalidRegex.test(_.toString(i))) {
                invalid.push(i);
            }
        }
    });

    // console.log('invalid', invalid)

    const sum = _.sum(invalid)
    console.log('sum', sum)
}

main();
