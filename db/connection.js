const MongoClient = require('mongodb').MongoClient;

const connection = (app, uri, opts) => {
    if (typeof uri !== 'string')
        throw new TypeError('Error: Unexpected mongodb connection url');

    opts = opts || {};
    const property = opts.property || 'db';
    let connect;
    return (req, res, next) => {
        if (!connect) {
            connect = MongoClient.connect(uri, opts);
        }
        connect
            .then(db => {
                req[property] = db;
                app.set('mongodb', db);
                next();
            })
            .catch(err => {
                connect = undefined;
                next(err);
            })
    }
};

const mongo = (collection, method, ...args) =>
    new Promise((resolve, reject) => 
        collection[method](args[0], args[1], args[2], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    )


module.exports = {
    connection,
    mongo
}
