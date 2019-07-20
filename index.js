const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const size = 30;
let world;

var grass = `<img width="20" src="https://cdna.artstation.com/p/assets/images/images/006/295/124/large/sergiu-matei-grass-tile-pixel-art-rpg-top-view-indie-game-dev-matei-sergiu.jpg?1497472728"></img>`;
var water = `<img width="20" src="http://pixelartmaker.com/art/5951a04864c3c7b.png"</img>`;

let createWorld = (size) => {
    let world = [];
    for (let i = 0; i < size; ++i) {
        world[i] = [];
        for (let j = 0; j < size; ++j) {
            world[i][j] = 'D';
            var chance = Math.random();
            if (chance > 0.75) {
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

let displayWorld = (world) => {
    let res = [];
    for (let i = 0; i < world.length; ++i) {
        for (let j = 0; j < world[i].length; ++j) {
            // TODO DISPLAY GOOD
            if (world[i][j] == 'W') {
                display = water;
            } else {
                display = grass;
            }

            if (guy.x == j && guy.y == i) display = '<img width="20" alt="golem" title="golem" src="https://cdn.discordapp.com/attachments/545317396919877635/601936859626733598/unknown.png"></img>';
            if (guy2.x == j && guy2.y == i) display ='<img width="20" alt="golem" title="golem" src="https://cdn.discordapp.com/attachments/545317396919877635/601936859626733598/unknown.png"></img>';
            res.push(display);
        }
        res.push('<br />');
    }
    return res.join('');
}



/*
*/
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
        <h3>Guy 1 Controls</h3>
        <button name="action" value="up">Up</button><br>
        <button name="action" value="down">Down</button><br>
        <button name="action" value="left">Left</button><br>
        <button name="action" value="right">Right</button><br><br>
    </form>

    <form action="/" method="post">
        <h3>Guy 2 Controls</h3>
        <button name="action2" value="up">Up</button><br>
        <button name="action2" value="down">Down</button><br>
        <button name="action2" value="left">Left</button><br>
        <button name="action2" value="right">Right</button><br><br>
    </form>

    <form action="/reset" method="get">
        <input type="submit" value="Reset World">
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
                url: "/",
                data: {
                    action: action,
                    action2: action2
                },
                success: function() {
                    console.log("Moved " + action);
                }
            });
            window.location.replace("/");
        });
    </script>
`;

world = createWorld(size);

app.get('/', (req, res) => {
    res.send(displayWorld(world) + moveButtonHtml);
});

app.get('/reset', (req, res) => {
    world = createWorld(size);
    guy = {
        x: 0,
        y: 0
    };
    guy2 = {
        x: 5,
        y: 5
    };
    res.redirect('/');
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
