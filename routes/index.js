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

router.post('/file', upload.single('file'), (req, res, next) => {
    console.log(req);
    res.sendStatus(200);
});

module.exports = router;
