import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.csv';
const input = 'input.csv';

function main() {
    const inputLines = util.loadInput(input, { split: '' });

    let tLines = inputLines[0].map((val, index) => inputLines.map(row => row[row.length - index - 1]))

    let total = 0;
    let numberSubList = []
    _.forEach(tLines, (line) => {
        if (_.isEmpty(_.trim(_.join(line, '')))) {
            return;
        }

        let operation = _.last(line);
        let numberList = _.initial(line);

        numberSubList.push(_.parseInt(_.join(numberList, '')));

        if (operation !== ' ') {
            let calculate = (operation === '*') ? ((a, b) => a * b) : ((a, b) => a + b);
            let subtotal = _.reduce(numberSubList, calculate)
            total += subtotal;

            // console.log('subtotal', subtotal)
            numberSubList = []
        }
    });
    console.log('total', total)
    // 12730301302913 - too high
}

main();
