const MongoClient = require('mongodb').MongoClient;


module.exports = (app, uri, opts) => {
    if (typeof uri !== 'string')
        throw new TypeError('Error: Unexpected mongodb connection url');

    opts = opts || {};
    const property = opts.property || 'db';

    let connection;

    return (req, res, next) => {
        if (!connection) {
            connection = MongoClient.connect(uri, opts);
        }

        connection
            .then(db => {
                req[property] = db;
                app.set('mongodb', db);
                next();
            })
            .catch(err => {
                connection = undefined;
                next(err);
            })
    }
};
