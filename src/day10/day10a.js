import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { split: ' '});
    const machineList = _.map(inputLines, (line) => {
        const buttons = _.map(_.slice(line, 1, -1), (buttonStr) => {
            const indexStr = _.join(_.slice(buttonStr, 1, -1), '');
            const indexList = _.split(indexStr, ',');
            return _.map(indexList, _.parseInt);
        });
        const goal = _.map(_.slice(line[0], 1, -1), (bit) => {
            return bit !== '.';
        });
        const current = [_.map(goal, () => false)]
        const count = 0;

        return {
            buttons,
            goal,
            current,
            count
        }
    });
    const checkGoal = (goal, guess) => {
        return _.every(goal, (bit, i) => bit === guess[i])
    }

    const count01 = _.map(machineList, (machine) => {
        while (!_.some(machine.current, (c1) => checkGoal(machine.goal, c1))) {
            const buttonPresses = _.map(machine.current, (current) => {
                return _.map(machine.buttons, (button) => {
                    return _.map(current, (bit, i) => {
                        return _.includes(button, i) ? !bit : bit;
                    })
                })
            })
            machine.current = _.uniqWith(_.flatten(buttonPresses), _.isEqual)
            machine.count++;
        }

        // console.log('machine', machine)
        return machine.count;
    });
    console.log('result:', _.sum(count01))
}

main();
