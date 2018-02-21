const express = require('express');
const R = require('ramda');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storageDIR = path.join(__dirname, '..', 'storage');

/* GET home page. */
router.get('/', (req, res, next) =>
  fs.readdir(storageDIR, (err, files) => {
    if (err) return res.render('index', { files: 'error read folder' });
    return res.render('index', { files: R.reject(R.equals('.gitkeep'))(files) })

  })
);

module.exports = router;
