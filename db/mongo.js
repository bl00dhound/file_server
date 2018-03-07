
module.exports = (collection, method, ...args) =>
    new Promise((resolve, reject) => 
        collection[method](args[0], args[1], args[2], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    )