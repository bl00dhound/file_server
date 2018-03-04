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

const setNewTokens = (db, user, res) => {
    return mongo(db.collection('Users'), 'insert')
}
        
const checkUserCredentials = ({ db, body }, res) => 
    mongo(db.collection('Users'), 'findOne', { username: body.username })
        .then(user => {
            if (user.hash !== encryptPassword(body.password, salt)) throw Error('Autorization error');
            return setNewTokens(db, user, res);


            console.log(user)
            return res.sendStatus(200)
        })
        .catch((err) => {
            cosnole.error(err);
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
