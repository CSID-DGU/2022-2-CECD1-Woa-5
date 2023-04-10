const crypto = require("crypto");


exports.mp = function createHashedPassword(password){
    return crypto.createHash("sha512").update(password).digest("base64");
};

