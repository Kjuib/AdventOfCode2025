import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.test2.txt';
// const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { split: ' '});
    const map = {};
    _.forEach(inputLines, (line) => {
        let key = _.join(_.initial(line[0]), '');

        map[key] = _.tail(line);
    });

    let calc = (start, target, deadends) => {
        let queue = [];
        let cache = {};
        let same = {};

        let first = { location: start, path: start };
        queue.push(first);

        while (!_.isEmpty(queue)) {
            let current = queue.pop();
            let nextList = map[current.location];
            let sameValue = _.get(same, current.location, 0) + 1
            _.set(same, current.location, sameValue)
            if (sameValue > 1) {
                console.log('same', current.location, sameValue, current.path)
            }

            if (current.location === target) {
                let pathList = _.split(current.path, '|');
                console.log('FOUND', pathList)
                while (_.size(pathList) > 0) {
                    let cacheKey = pathList.shift();
                    let cacheValue = _.get(cache, cacheKey, 0);
                    _.set(cache, cacheKey, cacheValue + 1);
                }
            } else {
                _.forEach(nextList, (next) => {
                    if (!_.includes(current.path, next) && !_.includes(deadends, next)) {
                        let nextPath = current.path + '|' + next;
                        let cacheValue = _.get(cache, next, 0);
                        if (cacheValue > 0) {
                            console.log('CACHE', nextPath)
                            let pathList = _.split(nextPath, '|');
                            while (_.size(pathList) > 0) {
                                let cacheKey = pathList.shift();
                                let cacheValue = _.get(cache, cacheKey, 0);
                                _.set(cache, cacheKey, cacheValue + 1);
                            }
                        } else {
                            queue.push({ location: next, path: nextPath })
                        }
                    }
                });
            }
        }

        return _.get(cache, start, 0)
    }

    // let s2d = calc('svr', 'dac', ['fft', 'out']);
    // console.log('===============', 's2d', s2d)
    // let d2f = calc('dac', 'fft', ['out']);
    // console.log('===============', 'd2f', d2f)
    // let f2o = calc('fft', 'out', []);
    // console.log('===============', 'f2o', f2o)
    // console.log('===============', 'Total1', (s2d * d2f * f2o));

    let s2f = calc('svr', 'fft', ['dac', 'out']);
    console.log('===============', 's2f', s2f)
    // let f2d = calc('fft', 'dac', ['out']);
    // console.log('===============', 'f2d', f2d)
    // let d2o = calc('dac', 'out', []);
    // console.log('===============', 'd2o', d2o)
    // console.log('===============', 'Total2', (s2f * f2d * d2o));
}

main();
