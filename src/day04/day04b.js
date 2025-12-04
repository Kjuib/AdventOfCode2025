import * as util from '../util.js';
import * as grid from '../grid.js';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const map = util.loadInput(input, { split: '' });

    let found = 0;
    let hasMore = true;
    do {
        hasMore = false;
        grid.each(map, (value, x, y) => {
            if (value === '@') {
                let neighbors = 0
                grid.eachDirection(map, x, y, (neighborValue) => {
                    if (neighborValue === '@') {
                        neighbors++;
                    }
                })

                if (neighbors < 4) {
                    found++;
                    hasMore = true;
                    grid.set(map, x, y, '.')
                }
            }
        });
    } while (hasMore)

    console.log('found', found)
}

main();
