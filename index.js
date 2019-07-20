const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Game = require('./game');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let interval = setInterval(() => {
    Game.updateWorld();
}, 500);

console.log(Game.gay());

let moveButtonHtml = `
    <h1>YAYO YAYOOOOO DREAMIN</h1>
    <p>
        Guy 1 Controls: Move with W A S D or the buttons below.<br>
        Guy 2 Controls: I J K L or buttons below
    </p>
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
        // keyCodes:
        // a=65 s=83 d=68 w=87
        // i=73 j=74 k=75 l=76
        let action = "none";
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

let world = Game.createWorld();

app.get('/', (req, res) => {
    res.send(Game.displayWorld(world) + moveButtonHtml);
});

app.get('/reset', (req, res) => {
    Game.resetWorld(world);
    res.redirect('/');
});

app.post('/', (req, res) => {
    let action = req.body.action;
    let action2 = req.body.action2;

    // Guy 1 movement
    switch (action) {
        case 'up':
            Game.guy.y--;
            break;
        case 'down':
            Game.guy.y++;
            break;
        case 'left':
            Game.guy.x--;
            break;
        case 'right':
            Game.guy.x++;
            break;
        default:
            break;
    }

    // Guy 2 movement
    switch (action2) {
        case 'up':
            Game.guy2.y--;
            break;
        case 'down':
            Game.guy2.y++;
            break;
        case 'left':
            Game.guy2.x--;
            break;
        case 'right':
            Game.guy2.x++;
            break;
        default:
            break;
    }
    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
