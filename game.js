const size = 20;

let imgGuy1 = '<img width="20" alt="golem" title="golem" src="https://cdn.discordapp.com/attachments/545317396919877635/601936859626733598/unknown.png"></img>';
let imgGuy2 = '<img width="20" alt="golem" title="golem" src="https://cdn.discordapp.com/attachments/545317396919877635/601936859626733598/unknown.png"></img>';
let imgGrass = `<img width="20" src="https://cdna.artstation.com/p/assets/images/images/006/295/124/large/sergiu-matei-grass-tile-pixel-art-rpg-top-view-indie-game-dev-matei-sergiu.jpg?1497472728"></img>`;
let imgWater = `<img width="20" src="http://pixelartmaker.com/art/5951a04864c3c7b.png"</img>`;
let imgBunny = `<img width="20" src="data:image/png;base64,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"></img>`;
let imgTree = `<img width="20" height="20" src="https://rsknowledge.files.wordpress.com/2010/10/normal_tree1.png"</img>`;

let displayWorld = (world) => {
    let res = [];
    for (let i = 0; i < world.length; ++i) {
        for (let j = 0; j < world[i].length; ++j) {

            if (world[i][j] == 'W') {
                display = imgWater;
            } else if (world[i][j] == 'T') {
                display = imgTree;
            } else {
                display = imgGrass;
            }
            if (guy.x == j && guy.y == i) display = imgGuy1;
            if (guy2.x == j && guy2.y == i) display = imgGuy2;
            if (bunny.x == j && bunny.y == i) display = imgBunny;

            res.push(display);
        }
        res.push('<br />');
    }
    return res.join('');
}

let createWorld = () => {
    let world = [];
    for (let i = 0; i < size; ++i) {
        world[i] = [];
        for (let j = 0; j < size; ++j) {
            world[i][j] = 'D';
            let chance = Math.random();
            if (chance > 0.95) {
                world[i][j] = 'T';
            } else if (chance > 0.80) {
                world[i][j] = 'W';
            }
        }
    }
    return world;
}

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

let updateWorld = () => {
    /*
    let randI = Math.floor(Math.random() * size);
    let randJ = Math.floor(Math.random() * size);
    let randL = String.fromCharCode("A".charCodeAt(0) + Math.floor(Math.random() * 24));
    world[randI][randJ] = randL;
    */
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

let resetWorld = (world) => {
    world = createWorld(size);
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

module.exports = {
    createWorld,
    updateWorld,
    resetWorld,
    displayWorld,
    guy,
    guy2
}
