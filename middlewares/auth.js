const crypto = require('crypto');
const R = require('ramda');
const { DateTime } = require('luxon');
const { salt } = require('../config/config.json');
const mongo = require('../db/mongo');

const generateHash = () =>
    crypto.randomBytes(32)
        .toString('hex')

const encryptPassword = (password, salt) =>
    crypto.createHmac('sha256', salt)
        .update(password)
        .digest('hex')

const nowPlusMonth = () => DateTime.local().plus({ month: 1 }).toISO()

const checkExpired = (token_expire) =>
    DateTime.local() >= DateTime.fromJSDate(token_expire)

const setNewToken = (db, user, res) =>
    mongo(
        db.collection('Users'),
        'findOneAndUpdate',
        { username: user.username },
        {
            $set : {
                auth_token: {
                    token: generateHash(),
                    expire: new Date(nowPlusMonth()),
                }
            }
        },
        { new: true }
    )
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(401);
        })

const decryptCredentials = ({ headers, body }, res, next) => {
    const base64String = R.compose(R.last, R.split(' '), R.prop('authorization'))(headers);
    if (!base64String) return res.send(401);
    const [ username, password ] = R.compose(R.split(':'), R.toString)(new Buffer(base64String, 'base64'))
    body.username = username;
    body.password = password;
    next();
}
        
const checkUserCredentials = ({ db, body }, res) => 
// createUser(db, body)
    mongo(db.collection('Users'), 'findOne', { username: body.username })
        .then(user => {
            if (user.hash !== encryptPassword(body.password, salt)) throw Error('Autorization error');

            if (checkExpired(user.auth_token.expire)) {
                return setNewToken(db , user, res)
            }

            console.log(user)
            return res.sendStatus(200)
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(401);
        })

module.exports = {
    decryptCredentials,
    checkUserCredentials,
}




// from create new user
function createUser(db, body) {
    return mongo(db.collection('Users'), 'insert', {
        username: body.username,
        hash: encryptPassword(body.password, salt),
        auth_token: {
            token: generateHash(),
            expire: new Date(nowPlusMonth()),
        },
        api_token: {
            token: generateHash(),
            expire: new Date(nowPlusMonth()),
        }
    })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
}
