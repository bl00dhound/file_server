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
    return mongo(db.collection('Users'), 'insert',)
}
        
const checkUserCredentials = ({ db, body }, res) => 

    mongo(db.collection('Users'), 'findOne', { username: body.username })
        .then(user => {
            if (user.hash !== encryptPassword(body.password, salt)) throw Error('Autorization error');
            // return setNewTokens(db, user, res);
            console.log(user)
            res.sendStatus(200)
        })
        .catch(res.sendStatus(401))

    // return Users.findOne({ username }, (err, user) => {
    //     if (err || !user) return res.sendStatus(401);
        
    //     if (user.hash === encryptPassword(password, salt)) {
    //         console.log(user)
    //         return setNewTokens(user, res)
    //     }

    //     return res.sendStatus(401);
    // })

module.exports = {
    checkUserCredentials,
}