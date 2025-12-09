import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { split: ',', isIntegers: true });

    let areaList = [];
    for (let i = 0; i < inputLines.length - 1; i++) {
        for (let j = i + 1; j < inputLines.length; j++ ) {
            const tile1 = inputLines[i];
            const tile2 = inputLines[j];

            let side1 = (tile1[0] > tile2[0] ? tile1[0] - tile2[0] : tile2[0] - tile1[0]) + 1;
            let side2 = (tile1[1] > tile2[1] ? tile1[1] - tile2[1] : tile2[1] - tile1[1]) + 1;

            const area = side1 * side2;

            areaList.push({ tile1, tile2, area });
        }
    }

    let areaSorted = _.orderBy(areaList, 'area', 'desc');
    console.log('Result:', areaSorted[0])
}

main();
