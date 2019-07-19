const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

let guy = {
    x: 0,
    y: 0
}

let displayWorld = (world) => {
    let res = "";
    for (let i = 0; i < world.length; ++i) {
        for (let j = 0; j < world[i].length; ++j) {
            let display = world[i][j];
            if (guy.x == j && guy.y == i) display = 'G';
            res += `[${display}]`;
        }
        res += '<br />';
    }
    return res;
}

/*
let interval = setInterval(() => {
    let randI = Math.floor(Math.random() * size);
    let randJ = Math.floor(Math.random() * size);
    let randL = String.fromCharCode("A".charCodeAt(0) + Math.floor(Math.random() * 24));
    world[randI][randJ] = randL;
    guy.y++;

}, 1000);
*/

let moveButtonHtml = `
    <h1>YAYO YAYOOOOO</h1>
    <form action="/" method="post">
        <input type="radio" name="action" value="up" checked> Up<br>
        <input type="radio" name="action" value="down"> Down<br>
        <input type="radio" name="action" value="left"> Left<br>
        <input type="radio" name="action" value="right"> Right<br>
        <input type="submit" value="I am but a submit">
    </form>
`;

world = createWorld(size);

app.get('/', (req, res) => {
    res.send(displayWorld(world) + moveButtonHtml);
});

app.post('/', (req, res) => {
    console.log(req.body);
    let action = req.body.action;
    switch (action) {
        case 'up':
            guy.y--;
            break;
        case 'down':
            guy.y++;
            break;
        case 'left':
            guy.x--;
            break;
        case 'right':
            guy.x++;
            break;
        default:
            break;
    }
    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
