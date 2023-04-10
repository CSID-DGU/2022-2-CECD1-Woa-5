const crypto = require("crypto");
const util = require("util");

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);


const createHashedPassword = (password) => {
    return crypto.createHash("sha512").update(password).digest("base64");
};


console.log(createHashedPassword("qweasd123!"))
console.log(createHashedPassword("qweasd123!"))
console.log(createHashedPassword("qweasd123!"))