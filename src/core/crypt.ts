var CryptoJS = require('crypto-js');

export function encrypt(value: string) {
    const secretKey = CryptoJS.enc.Utf8.parse('AAECAwQFBgcICQoLDA0ODw==');
    const secureIv = CryptoJS.enc.Utf8.parse('HR$2pIjHR$2pIj12');
    const encryptedValue = CryptoJS.AES.encrypt(value, secretKey, {
        keySize: 128,
        iv: secureIv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encryptedValue.toString();
}