const express = require('express');
const R = require('ramda');
const path = require('path');

const router = express.Router();

const checkCookies = cookies => false;


router.use(/(^\/$)|(\/files.*)/, (req, res, next) => {
    console.log(req.body)
    console.log('Cookies: ', req.cookies)

    if (checkCookies(req.cookies)) next();

    res.render('login', { message: 'Please, login.' });
});

module.exports = router;
