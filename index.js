const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const size = 30;
let world;

let createWorld = (size) => {
    let world = [];
    for (let i = 0; i < size; ++i) {
        world[i] = [];
        for (let j = 0; j < size; ++j) {
            world[i][j] = ' ';
        }
    }
    return world;
}

let displayWorld = (world) => {
    let res = "";
    for (let i = 0; i < world.length; ++i) {
        for (let j = 0; j < world[i].length; ++j) {
            res += `[${world[i][j]}]`;
        }
        res += '<br />';
    }
    return res;
}

let interval = setInterval(() => {
    let randI = Math.floor(Math.random() * size);
    let randJ = Math.floor(Math.random() * size);
    let randL = String.fromCharCode("A".charCodeAt(0) + Math.floor(Math.random() * 24));
    world[randI][randJ] = randL;
}, 1000);

world = createWorld(size);

app.get('/', (req, res) => {
    res.send(displayWorld(world));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
