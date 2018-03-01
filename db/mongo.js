

const R = require('ramda');


module.exports = (collection, method, ...args) =>
    new Promise((resolve, reject) => {
        const mongoFunc = collection[method];
        const argsCount = mongoMethodMapping[method];



        collection[method](args, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })