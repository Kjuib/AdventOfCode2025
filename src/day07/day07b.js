import * as util from '../util.js';
import * as grid from '../grid.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const map = util.loadInput(input, { split: '' });

    let found = 0;
    let timelines = [];
    grid.each(map, (value, x, y) => {
        let upper = grid.get(map, x, y-1, '.');
        if (value === '|') {
            // ignore
        } else if (value === 'S') {
            _.set(timelines, x, 1)
        } else if (value === '.') {
            if (upper === '|' || upper === 'S') {
                grid.set(map, x, y, '|');
            }
        } else if (value === '^') {
            let upper = grid.get(map, x, y-1, '.');
            if (upper === '|') {
                grid.set(map, x-1, y, '|');
                _.set(timelines, x-1, _.get(timelines, x, 0) + _.get(timelines, x-1, 0));
                grid.set(map, x+1, y, '|');
                _.set(timelines, x+1, _.get(timelines, x, 0) + _.get(timelines, x+1, 0));
                _.set(timelines, x, 0);

                found++;
            }
        }
    });

    // grid.printGrid(map)

    console.log('found', found)
    console.log('timelines', _.sum(timelines))

    // 3118 - too low
}

main();
