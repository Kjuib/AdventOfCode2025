import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input);

    const startLocation = 50;

    let location = startLocation;
    let zeroCount = 0;

    _.forEach(inputLines, (rotation) => {
        let direction = _.head(rotation);
        let distance = _.parseInt(_.tail(rotation).join(''));

        let pastZero = _.floor(_.divide(distance, 100))
        if (direction === 'L') {
            distance *= -1;
        }

        // console.log('distance', distance)

        let diff = distance % 100;
        let newLocation = location + diff;

        if (newLocation < 0) {
            newLocation += 100
            if (newLocation !== 0 && location !==0) {
                pastZero++;
            }
        } else if (newLocation > 99) {
            newLocation -= 100;
            if (newLocation !== 0 && location !==0) {
                pastZero++;
            }
        }

        location = newLocation;

        // console.log('location', location);

        if (location === 0) {
            pastZero++;
        }

        zeroCount += pastZero;
    });

    console.log('zeroCount', zeroCount)
}

main();
