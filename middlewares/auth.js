const crypto = require('crypto');
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

const setNewToken = (db, user, res) =>
    mongo(
        db.collection('Users'),
        'updateOne',
        { username: user.username },
        {
            $set : {
                auth_token: {
                    token: generateHash(),
                    expire: DateTime.local().plus({ month: 1 }).toISO()
                }
            }
        }
    )
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(401);
        })

const checkExpired = (token_expire) =>
    DateTime.local() >= DateTime.fromISO(token_expire);
        
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
    checkUserCredentials,
}





function createUser(db, body) {
    return mongo(db.collection('Users'), 'insert', {
        username: body.username,
        hash: encryptPassword(body.password, salt),
        auth_token: {
            token: generateHash(),
            expire: DateTime.local().plus({ month: 1 }).toISO(),
        },
        api_token: {
            token: generateHash(),
            expire: DateTime.local().plus({ month: 1 }).toISO()
        }
    })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
}
