const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mongo = require('../db/connection');

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

    console.log(username, password)
    console.log(mongo)

    res.sendStatus(200);
});

module.exports = router;