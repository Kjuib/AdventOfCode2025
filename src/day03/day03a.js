import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { split: '', isIntegers: true });

    let totalVoltage = 0;

    _.forEach(inputLines, (line) => {
        let num1 = _.max(_.initial(line))

        let num1Index = _.indexOf(line, num1);
        let restOfLine = _.drop(line, num1Index + 1);

        let num2 = _.max(restOfLine)
        
        let voltage = _.parseInt(`${num1}${num2}`);
        
        totalVoltage += voltage; 
    })
    
    console.log('totalVoltage', totalVoltage)
}

main();
