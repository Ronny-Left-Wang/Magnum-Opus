const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Game = require('./game');
const Html = require('./html');
const Ascii = require('./ascii');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Game.createWorld();

let interval = setInterval(() => {
    Game.updateWorld();
}, 500);

app.get('/', (req, res) => {
    res.send(Game.displayWorld() + Html.moveButtonHtml + (Ascii.deer));
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
