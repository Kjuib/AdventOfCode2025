import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.csv';
const input = 'input.csv';

function main() {
    const inputLines = util.loadInput(input, { split: ' ' });

    let lines = _.map(inputLines, _.compact);

    let operations = _.last(lines);
    let numberList = _.map(_.initial(lines), (line) => {
        return _.map(line, _.parseInt);
    });

    let total = _.reduce(operations, (total, operation, i) => {
        let numbers = _.map(numberList, (subList) => subList[i])
        let calculate = (operation === '*') ? ((a, b) => a * b) : ((a, b) => a + b);
        let subtotal = _.reduce(numbers, calculate)
        // console.log('subtotal', subtotal)

        return total + subtotal;
    }, 0)

    console.log('total', total)
}

main();
