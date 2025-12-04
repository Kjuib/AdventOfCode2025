import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { split: '', isIntegers: true });

    let totalVoltage = 0;

    _.forEach(inputLines, (line) => {
        let numStr = '';
        let leftIndex = 0;

        for (let i = 12; i > 0; i--) {
            let subLine1 = _.drop(line, leftIndex);
            let subLine2 = _.dropRight(subLine1, i - 1);
            let num = _.max(subLine2);

            leftIndex += _.indexOf(subLine1, num) + 1;
            numStr += num;
        }

        let voltage = _.parseInt(numStr);

        totalVoltage += voltage;
    })

    console.log('totalVoltage', totalVoltage)
}

main();
