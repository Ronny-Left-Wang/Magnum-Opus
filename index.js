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
let guy2 = {
    x: 5,
    y: 5
}

var grass = `<img width="20" src="https://cdna.artstation.com/p/assets/images/images/006/295/124/large/sergiu-matei-grass-tile-pixel-art-rpg-top-view-indie-game-dev-matei-sergiu.jpg?1497472728"></img>`;
var water = `<img width="20" src="http://pixelartmaker.com/art/5951a04864c3c7b.png"</img>`;

let displayWorld = (world) => {
    let res = "";
    for (let i = 0; i < world.length; ++i) {
        for (let j = 0; j < world[i].length; ++j) {
            // TODO DISPLAY GOOD

            let chance = Math.random() * 1;
            let display;

            // I think this means there is a 25% chance for a tile being water. Leaving 75% chance to be grass.
            if (chance > 0.25) {
                display = grass;
            } else {
                display = water;
            }
            if (guy.x == j && guy.y == i) display = '<img width="20" alt="golem" title="golem" src="https://cdn.discordapp.com/attachments/545317396919877635/601936859626733598/unknown.png"></img>';
            if (guy2.x == j && guy2.y == i) display ='<img width="20" alt="golem" title="golem" src="https://cdn.discordapp.com/attachments/545317396919877635/601936859626733598/unknown.png"></img>';
            res += `${display}`;
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
    <h1>YAYO YAYOOOOO DREAMIN</h1>
    <!-- TODO Do in button form instead --> 
    <form action="/" method="post">
        <button name="action" value="up">Up</button><br>
        <button name="action" value="down">Down</button><br>
        <button name="action" value="left">Left</button><br>
        <button name="action" value="right">Right</button><br><br>
        <input type="submit" value="Refresh page">
    </form>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script>
        // javascript
        /* TODO USE BUTTONS TO MOVE CHARACTER
        if dude press WASD then
            // use $.ajax
            send a post request to / to move guy
        */

        // keyCodes:
        // a=65 s=83 d=68 w=87
        // i=73 j=74 k=75 l=76
        var action = "none";
        var action2 = "none";
        window.addEventListener('keydown', function(e) {
            switch(e.keyCode) {
            case 65:
                action = "left";
                break;
            case 83:
                action = "down";
                break;
            case 68:
                action = "right";
                break;
            case 87:
                action = "up";
                break;
            case 74:
                action2 = "left";
                break;
            case 75:
                action2 = "down";
                break;
            case 76:
                action2 = "right";
                break;
            case 73:
                action2 = "up";
                break;
            default:
                action = "none";
            }
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/",
                data: {
                    action: action,
                    action2: action2
                },
                success: function() {
                    console.log("Moved " + action);
                }
            });
            window.location.replace("http://localhost:3000/");
        });
    </script>
`;

world = createWorld(size);

app.get('/', (req, res) => {
    res.send(displayWorld(world) + moveButtonHtml);
});

app.post('/', (req, res) => {
    console.log(req.body);
    let action = req.body.action;
    let action2 = req.body.action2;

    // Guy 1 movement
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
    // Guy 2 movement
    switch (action2) {
        case 'up':
            guy2.y--;
            break;
        case 'down':
            guy2.y++;
            break;
        case 'left':
            guy2.x--;
            break;
        case 'right':
            guy2.x++;
            break;
        default:
            break;
    }
    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
