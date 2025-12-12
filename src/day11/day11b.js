import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.txt';
// const input = 'input.test2.txt';
// const input = 'input.test3.txt';

function main() {
    const inputLines = util.loadInput(input, { split: ' '});
    const map = new Map();
    _.forEach(inputLines, (line) => {
        let key = _.join(_.initial(line[0]), '');
        map.set(key, _.tail(line));
    });

    const calc = _.memoize((start, end) => {
        let paths = 0;
        _.forEach(map.get(start), (next) => {
            if (next === end) {
                paths += 1;
            } else if (!map.has(next)) {
                // ignore
            } else {
                paths += calc(next, end);
            }
        })
        return paths;
    }, (start, end) => start + '|' + end);

    let s2d = calc('svr', 'dac');
    console.log('===============', 's2d', s2d)
    let d2f = calc('dac', 'fft');
    console.log('===============', 'd2f', d2f)
    let f2o = calc('fft', 'out');
    console.log('===============', 'f2o', f2o)
    console.log('===============', 'Total1', (s2d * d2f * f2o));

    let s2f = calc('svr', 'fft');
    console.log('===============', 's2f', s2f)
    let f2d = calc('fft', 'dac');
    console.log('===============', 'f2d', f2d)
    let d2o = calc('dac', 'out');
    console.log('===============', 'd2o', d2o)
    console.log('===============', 'Total2', (s2f * f2d * d2o));
}

main();
