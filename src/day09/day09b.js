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
            const minX = _.min([tile1[0],tile2[0]])
            const minY = _.min([tile1[1],tile2[1]])
            const maxX = _.max([tile1[0], tile2[0]])
            const maxY = _.max([tile1[1], tile2[1]])

            let side1 = maxX - minX + 1;
            let side2 = maxY - minY + 1;

            const area = side1 * side2;

            areaList.push({
                min: [minX, minY],
                max: [maxX, maxY],
                area
            });
        }
    }

    let validList = [];
    for (let i = 0; i < inputLines.length; i++) {
        const tile1 = inputLines[i];
        const tile2 = inputLines[(i + 1) % inputLines.length] // The mod makes it auto wrap to the first item
        const minX = _.min([tile1[0],tile2[0]])
        const minY = _.min([tile1[1],tile2[1]])
        const maxX = _.max([tile1[0], tile2[0]])
        const maxY = _.max([tile1[1], tile2[1]])

        validList.push({
            min: [minX, minY],
            max: [maxX, maxY]
        })
    }

    let areaFiltered = _.filter(areaList, (areaObj) => {
        return !_.some(validList, (validObj) => {
            return areaObj.min[0] < validObj.max[0]
                && areaObj.max[0] > validObj.min[0]
                && areaObj.min[1] < validObj.max[1]
                && areaObj.max[1] > validObj.min[1]
        });
    });

    let areaSorted = _.orderBy(areaFiltered, 'area', 'desc');
    console.log('Result:', areaSorted[0])
}

main();
