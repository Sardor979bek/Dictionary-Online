var mysql = require('mysql');
const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/:word', (req, res) => {

    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Prsard1997',
        database: 'entries'
    });

    con.connect(function (err) {
        if (err) throw err;

        con.query(`SELECT * FROM entries WHERE word like "${req.params.word}%"`, (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result);
        });
    });
});

module.exports = router;