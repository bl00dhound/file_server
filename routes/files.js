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

/* GET home page. */
router.get('/', (req, res, next) =>
  fs.readdir(storageDIR, (err, files) => {
    if (err) return res.render('files', { files: 'error read folder' });
    return res.render('files', { files: R.reject(R.equals('.gitkeep'))(files) })
  })
);

router.delete('/', (req, res) => {
    fs.unlink(path.join(storageDIR, req.body.filename), err => {
       if (err) return res.sendStatus(400);
       return res.sendStatus(200);
    });
});

router.post('/', upload.single('file'), (req, res) => {
    res.sendStatus(201);
});

module.exports = router;
