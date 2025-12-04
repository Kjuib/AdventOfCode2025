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

        if (direction === 'L') {
            distance *= -1;
        }

        // console.log('distance', distance)

        location += distance;
        location %= 100;
        if (location < 0) {
            location += 100
        } else if (location > 99) {
            location -= 100
        }

        // console.log('location', location)

        if (location === 0) {
            zeroCount++;
        }
    });

    console.log('zeroCount', zeroCount)
}

main();
