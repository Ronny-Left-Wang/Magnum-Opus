const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let num = 0;

app.get('/', (req, res) => {
    res.send('niga' + num++);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
