const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { decryptCredentials, checkUserCredentials } = require('../middlewares/auth');

router.get('/', (req, res) => {
    console.log(req.body)
    console.log('login cookies: ', req.cookies)

    res.render('login');
});
//5MSaq2yH3YRQoYqC
router.post('/', decryptCredentials, checkUserCredentials);

module.exports = router;