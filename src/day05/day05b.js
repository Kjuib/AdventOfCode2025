import fs from 'fs';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const fileInput = fs.readFileSync(input);
    const sections = _.split(fileInput, '\n\n');

    let ranges = _.map(_.split(sections[0], '\n'), (rangeStr) => {
        let rangeSplit = rangeStr.split('-');
        return {
            min: _.parseInt(rangeSplit[0]),
            max: _.parseInt(rangeSplit[1])
        };
    })

    ranges = _.orderBy(ranges, 'min');

    // dedupe ranges
    for (let i = 0; i < ranges.length - 1; i++ ) {
        let r1 = ranges[i];
        let r2 = ranges[i + 1];

        if (r1.max >= r2.min) {
            if (r2.max > r1.max) {
                r1.max = r2.max;
            }
            ranges.splice(i + 1, 1);
            i--;
        }
    }

    _.forEach(ranges, (range) => {
        range.count = BigInt(range.max - range.min + 1);
    });

    // console.log('ranges', ranges)

    let total = _.sumBy(ranges, 'count');
    console.log('total', total)

}

main();
