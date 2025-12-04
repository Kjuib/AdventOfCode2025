import _ from 'lodash';

export function printGrid(data, separator = ' ') {
    const str = _.reduce(data, (acc, row) => {
        return acc + _.reduce(row, (acc, char) => {
            return acc + char + separator;
        }, '') + '\n';
    }, '');

    console.log(str, '\n');

    return str;
}

export function get(grid, x, y, defaultValue = '') {
    const row = _.get(grid, y, []);
    const cell = _.get(row, x, defaultValue);

    return cell;
}

export function set(grid, x, y, value) {
    if (grid[y] === undefined) {
        grid[y] = [];
    }
    grid[y][x] = value;
}

export function each(grid, func) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let value = get(grid, x, y);
            func(value, x, y);
        }
    }
}

export function eachDirection(grid, x, y, func) {
    let tlVal = get(grid, x - 1, y - 1)
    func(tlVal);
    let tmVal = get(grid, x, y - 1)
    func(tmVal);
    let trVal = get(grid, x + 1, y - 1)
    func(trVal);

    let slVal = get(grid, x - 1, y)
    func(slVal);
    let srVal = get(grid, x + 1, y)
    func(srVal);

    let blVal = get(grid, x - 1, y + 1)
    func(blVal);
    let bmVal = get(grid, x, y + 1)
    func(bmVal);
    let brVal = get(grid, x + 1, y + 1)
    func(brVal);
}
