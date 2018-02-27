const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const generateHash = () =>
    crypto.createHash('sha256')
        .update((Math.random() + Date.now()).toString(36))
        .digest('hex');

router.get('/', (req, res) => {
    console.log(req.body)
    console.log('login cookies: ', req.cookies)

    res.render('login');
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    const db = req.db;

    console.log(db.collection('Users'))
    console.log(username, password)

    res.sendStatus(200);
});

module.exports = router;