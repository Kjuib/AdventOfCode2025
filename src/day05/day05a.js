import fs from 'fs';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const fileInput = fs.readFileSync(input);
    const sections = _.split(fileInput, '\n\n');

    const ranges = _.map(_.split(sections[0], '\n'), (rangeStr) => {
        let rangeSplit = rangeStr.split('-');
        return {
            min: _.parseInt(rangeSplit[0]),
            max: _.parseInt(rangeSplit[1])
        };
    })

    const idInput = _.split(sections[1], '\n')
    const filteredInput = _.filter(idInput, _.negate(_.isEmpty));
    const idList = _.map(filteredInput, _.parseInt)

    let validCount = 0;
    _.forEach(idList, (id) => {

        for (let i = 0; i < ranges.length; i++) {
            let range = ranges[i];
            if (id >= range.min && id <= range.max) {
                validCount++;
                break;
            }
        }
    });

    console.log('validCount', validCount);
}

main();
