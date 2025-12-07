import * as util from '../util.js';
import * as grid from '../grid.js';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const map = util.loadInput(input, { split: '' });

    let found = 0;
    grid.each(map, (value, x, y) => {
        if (value === '|' || value === 'S') {
            // skip if we are starting point or already a laser
            return;
        } else if (value === '.') {
            let upper = grid.get(map, x, y-1, '.');
            if (upper === '|' || upper === 'S') {
                grid.set(map, x, y, '|');
            }
        } else if (value === '^') {
            let upper = grid.get(map, x, y-1, '.');
            if (upper === '|') {
                grid.set(map, x-1, y, '|');
                grid.set(map, x+1, y, '|');

                found++;
            }
        }
    });

    // grid.printGrid(map)

    console.log('found', found)
}

main();
