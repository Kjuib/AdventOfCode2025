import _ from 'lodash';
import fs from "fs";

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const fileInput = fs.readFileSync(input);
    const sectionInput = _.split(fileInput, '\n\n');

    const shapes = {};
    _.forEach(_.initial(sectionInput), (rawShape) => {
        const shapeLines = _.split(rawShape, '\n');
        const shapeIndex = _.parseInt(_.initial(shapeLines[0]));
        const shapeImage = _.tail(shapeLines);
        const count = _.countBy(_.join(shapeImage, ''), _.identity);
        shapes[shapeIndex] = { image: shapeImage, pieces: count['#'] };
    });

    const regions = _.map(_.initial(_.split(_.last(sectionInput), '\n')), (rawRegion) => {
        const split1 = _.split(rawRegion, ': ');
        const split2 = _.split(split1, 'x');
        const height = _.parseInt(split2[0]);
        const width = _.parseInt(split2[1]);
        const request = _.map(_.split(split1[1], ' '), _.parseInt);

        return { height, width, request };
    });

    const results = _.map(regions, (region) => {
        const totalSize = region.width * region.height;
        const totalRequest = _.reduce(region.request, (agg, count, index) => {
            return agg + (count * shapes[index].pieces)
        }, 0);

        return totalSize > totalRequest ? 1 : 0;
    });

    console.log('Results', _.sum(results));
}

main();
