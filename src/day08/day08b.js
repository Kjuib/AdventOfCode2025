import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputList = util.loadInput(input, { split: ',', isIntegers: true });
    const boxes = _.map(inputList, (inputLine, index) => {
        return {
            x: inputLine[0],
            y: inputLine[1],
            z: inputLine[2],
            circuit: 'cir' + _.padStart(index, 4, '0')
        }
    });

    let distanceList = [];
    for (let i = 0; i < boxes.length - 1; i++) {
        for (let j = i + 1; j < boxes.length; j++ ) {
            const box1 = boxes[i];
            const box2 = boxes[j];
            const distance = ((box1.x - box2.x) ** 2) + ((box1.y - box2.y) ** 2) + ((box1.z - box2.z) ** 2)
            distanceList.push({
                box1: i,
                box2: j,
                distance: distance
            })
        }
    }

    let distanceSorted = _.sortBy(distanceList, 'distance');
    for (let i = 0; i < distanceSorted.length; i++) {
        const distanceObj = distanceSorted[i];
        const box1 = boxes[distanceObj.box1];
        const box2 = boxes[distanceObj.box2];

        if (box1.circuit !== box2.circuit) {
            let oldValue = box2.circuit;
            _.forEach(boxes, (box) => {
                if (box.circuit === oldValue) {
                    box.circuit = box1.circuit;
                }
            });
        }

        let size = _.size(_.countBy(boxes, 'circuit'));
        if (size === 1) {
            console.log('DONE', box1, box2);
            console.log('result', box1.x * box2.x)
            break;
        }
    }
}

main();
