const crypto = require('crypto');

class Crypto {
    static chiper(psword) {
        return new Promise((resolve, reject) => {
           try {
                const encrypt = crypto.createCipher('des', process.env.KEY);
                const encryptResult = encrypt.update(psword, 'utf-8', 'base64')
                    + encrypt.final('base64');
                
                resolve(encryptResult);
           } catch(e) {
                reject(e);
           }
        })
    }

    static dechiper(psword) {
        return new Promise((resolve, reject) => {
            try {
                const decode = crypto.createDecipher('des', process.env.KEY);
                const decodeResult = decode.update(psword, 'base64', 'utf-8')
                    + decode.final('utf-8');

                resolve(decodeResult);
            } catch(e) {
                reject(e);
            }
        })
    }
}


module.exports = Crypto;