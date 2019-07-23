const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Game = require('./game');
const Html = require('./html');
const Ascii = require('./ascii');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + '/public'));

app.set('views', __dirname + '/jiews');
app.set('view engine', 'hbs');

Game.createWorld();

let interval = setInterval(() => {
    Game.updateWorld();
}, 500);

app.get('/', (req, res) => {
    res.send(Game.displayWorld() + Html.moveButtonHtml + Ascii.transgender(Ascii.deer));
});

app.get('/canvas', (req, res) => {
    // console.log(Game.getWorld());
    // Returns the exported modules and tells you what if it is a function.
    res.render('canvas', {'trees': JSON.stringify(Game.trees), 
        'bunny': JSON.stringify(Game.bunny),
        'guy1arr': JSON.stringify(Game.guy1arr), 
        'guy2arr': JSON.stringify(Game.guy2arr), 
        'bunnyarr': JSON.stringify(Game.bunnyarr), 
        'gameWorld': JSON.stringify(Game.getWorld())
    });
});

app.get('/reset', (req, res) => {
    Game.resetWorld();
    res.redirect('/');
});

app.post('/', (req, res) => {
    let action = req.body.action;
    let action2 = req.body.action2;

    if (action) {
        Game.moveGuy(1, action);
    }

    if (action2) {
        Game.moveGuy(2, action2);
    }

    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
