const express = require("express");
const app = express();

const words = require('./word');

app.use(express.json());
app.use(express.static(__dirname));

app.use('/api/words', words);
app.get('/', (req, res) => {
    res.sendFile('./dict.html', {
        root: __dirname
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));