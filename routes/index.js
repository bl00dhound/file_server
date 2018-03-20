const express = require('express');
const R = require('ramda');
const path = require('path');

const router = express.Router();
const { checkAuthCookie } = require('../middlewares/auth');


router.use('/', (req, res, next) => 
    checkAuthCookie(req, res)
        .then(
            R.ifElse(
                R.identity,
                () => res.redirect('/files'),
                () => res.redirect('/login')
            )
        )
    )
    // if (checkCookies(req.cookies)) next();
    // res.render('login', { message: 'Please, login.' });

module.exports = router;
