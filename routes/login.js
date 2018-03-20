const express = require('express');
const router = express.Router();
const cors = require('cors');
const crypto = require('crypto');

const { decryptCredentials, checkUserCredentials } = require('../middlewares/auth');

router.options('/', cors());

router.get('/', (req, res) => {
    console.log('login cookies: ', req.cookies)

    res.render('login');
});
//5MSaq2yH3YRQoYqC
router.post('/', decryptCredentials, checkUserCredentials);

module.exports = router;