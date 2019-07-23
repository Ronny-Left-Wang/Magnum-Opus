const size = 20;
let world;

let imgGuy1 = '<img rel="prefetch" width="20" alt="golem" title="golem" src="/public/images/golem.png"></img>';
let imgGuy2 = '<img rel="prefetch" width="20" alt="golem" title="golem" src="/public/images/golem.png"></img>';
let imgGrass = `<img rel="prefetch" width="20" src="/public/images/grass.png"></img>`;
let imgWater = `<img rel="prefetch" width="20" src="/public/images/water.png"</img>`;
let imgBunny = `<img rel="prefetch" width="20" height="20" src="/public/images/bunny.png"></img>`;
let imgTree = `<img rel="prefetch" width="20" height="20" src="/public/images/tree.png"</img>`;

let trees = [];
let guy1arr = [];
let guy2arr = [];
let bunnyarr = [];

let guy = {
    x: 0,
    y: 0
}
let guy2 = {
    x: 5,
    y: 5
}
let bunny = {
    x: 10,
    y: 10
}
guy1arr.push(guy);
guy2arr.push(guy2);
bunnyarr.push(bunny);

let displayWorld = () => {
    let res = [];
    for (let i = 0; i < world.length; ++i) {
        for (let j = 0; j < world[i].length; ++j) {

            if (world[i][j] == 'W') {
                display = imgWater;
            } else {
                display = imgGrass;
            }
            if (guy.x == j && guy.y == i) {
                display = imgGuy1;
                guy1arr.push({
                    x: guy.x,
                    y: guy.y
                });
            }
            if (guy2.x == j && guy2.y == i) {
                display = imgGuy2;
                guy2arr.push({
                    x: guy2.x,
                    y: guy2.y
                });
            }
            if (bunny.x == j && bunny.y == i) {
                display = imgBunny;
                bunnyarr.push({
                    x: bunny.x,
                    y: bunny.y
                });
            }

            res.push(display);
        }
        res.push('<br />');
    }
    return res.join('');
}

let createWorld = () => {
    world = [];
    for (let i = 0; i < size; ++i) {
        world[i] = [];
        for (let j = 0; j < size; ++j) {
            world[i][j] = 'D';
            let chance = Math.random();
            if (chance > 0.75) world[i][j] = 'W';
            if (world [i][j] != 'W') {
                if (Math.random() > 0.92) {
                    trees.push({
                        x: j,
                        y: i
                    });
                }
            }
        }
    }
}

let updateWorld = () => {
    let chancex = Math.random();
    let chancey = Math.random();
    if (chancex > 0.50) {
        bunny.x--;
    } else {
        bunny.x++;
    }
    if (chancey > 0.50) {
        bunny.y--;
    } else {
        bunny.y++;
    }
    if (bunny.y >= size || bunny.x >= size || bunny.x < 0 || bunny.y < 0) {
        bunny.x = 10;
        bunny.y = 10;
    }
};

let resetWorld = () => {
    createWorld();
    guy = {
        x: 0,
        y: 0
    };
    guy2 = {
        x: 5,
        y: 5
    };
    bunny = {
        x: 10,
        y: 10
    }
}

let moveGuy = (guyNumber, action) => {
    let guyToMove;
    if (guyNumber == 1) {
        guyToMove = guy;
    } else {
        guyToMove = guy2;
    }

    switch (action) {
        case 'up':
            guyToMove.y--;
            break;
        case 'down':
            guyToMove.y++;
            break;
        case 'left':
            guyToMove.x--;
            break;
        case 'right':
            guyToMove.x++;
            break;
        default:
            break;
    }
}

let getWorld = () => world;

module.exports = {
    createWorld,
    updateWorld,
    resetWorld,
    displayWorld,
    moveGuy,
    getWorld,
    guy1arr,
    guy2arr,
    bunnyarr,
    trees,
}
