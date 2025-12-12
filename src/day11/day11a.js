import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { split: ' '});
    const map = {};
    _.forEach(inputLines, (line) => {
        let key = _.join(_.initial(line[0]), '');

        map[key] = _.tail(line);
    });

    let found = [];
    let queue = [];

    let first = { location: 'you', path: 'you' };
    queue.push(first);

    while (!_.isEmpty(queue)) {
        let current = queue.pop();
        let nextList = map[current.location];
        _.forEach(nextList, (next) => {
            const newPath = current.path + '|' + next;
            if (next === 'out') {
                found.push(newPath);
            } else {
                queue.push({ location: next, path: newPath })
            }
        });
    }

    console.log('Count', _.size(found))
}

main();
