import * as util from '../util.js';
import _ from 'lodash';
import { init } from 'z3-solver';

// const input = 'input.test.txt';
const input = 'input.txt';

async function main() {
    const inputLines = util.loadInput(input, { split: ' '});
    const machineList = _.map(inputLines, (line) => {
        const buttons = _.map(_.slice(line, 1, -1), (buttonStr) => {
            const indexStr = _.join(_.slice(buttonStr, 1, -1), '');
            const indexList = _.split(indexStr, ',');
            return _.map(indexList, _.parseInt);
        });
        const goal = _.map(_.split(_.join(_.slice(_.last(line), 1, -1), ''), ','), _.parseInt);
        const current = [_.map(goal, () => 0)]
        const count = 0;

        return {
            buttons,
            goal,
            current,
            count
        }
    });
    const { Context } = await init();

    const count01 = [];
    for (let m = 0; m < _.size(machineList); m++) {
        const machine = machineList[m];
        const { Optimize, Int } = new Context("main");

        const variables = [];

        const solver = new Optimize();

        for (let i = 0; i < _.size(machine.buttons); i++) {
            const v = Int.const(`var${_.padStart(i, 2, '0')}`);
            solver.add(v.ge(0));
            variables.push(v);
        }

        for (let bit = 0; bit < _.size(machine.goal); bit++) {
            let condition = Int.val(0);

            _.forEach(machine.buttons, (button, buttonIndex) => {
                if (_.includes(button, bit)) {
                    condition = condition.add(variables[buttonIndex]);
                }
            })
            condition = condition.eq(Int.val(machine.goal[bit]));
            solver.add(condition);
        }

        const sumVariables = variables.reduce((agg, v) => agg.add(v), Int.val(0));

        solver.minimize(sumVariables);

        const result = await solver.check();
        if (result === "sat") {
            count01.push(+solver.model().eval(sumVariables).toString());
        } else {
            console.log('ERROR?!', result)
        }

    }
    console.log('count01', _.sum(count01))
}

await main();
