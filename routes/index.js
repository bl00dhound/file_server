const express = require('express');
const multer = require('multer');
const R = require('ramda');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const storageDIR = path.join(__dirname, '..', 'storage');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageDIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: multerStorage });

// const upload = multer({ dest: 'storage/' });

/* GET home page. */
router.get('/', (req, res, next) =>
  fs.readdir(storageDIR, (err, files) => {
    if (err) return res.render('index', { files: 'error read folder' });
    return res.render('index', { files: R.reject(R.equals('.gitkeep'))(files) })
  })
);

router.delete('/file', (req, res) => {
    console.log(req)
    res.sendStatus(200);
});

router.post('/file', upload.single('file'), (req, res) => {
    res.sendStatus(201);
});

module.exports = router;
