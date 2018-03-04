

const R = require('ramda');


module.exports = (collection, method, ...args) =>
    new Promise((resolve, reject) => {
        const [firstArg, secondArg] = args;
        const callback = (err, result) => {
            if (err) reject(err);
            resolve(result);
        }
        
        if (!secondArg) return collection[method](firstArg, callback);
        return collection[method](firstArg, secondArg, callback);
    })