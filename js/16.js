

var C = require("crypto-js")


const str = '75819-1665305558'
const strKey = '9ea414bd183d5a11'

var ciphertext = C.AES.encrypt(str, C.enc.Utf8.parse(strKey), { mode: C.mode.ECB, padding: C.pad.Pkcs7 }).toString();
var result = C.AES.decrypt(C.enc.Base64.parse(ciphertext), C.enc.Utf8.parse(strKey), { mode: C.mode.ECB, padding: C.pad.Pkcs7 }).toString(C.enc.Utf8);

// var ciphertext = C.AES.encrypt(C.enc.Hex.parse(str), C.enc.Hex.parse(strKey), { mode: C.mode.ECB, padding: C.pad.Pkcs7 }).ciphertext.toString()

// var result = C.AES.decrypt(C.lib.CipherParams.create({ ciphertext: C.enc.Hex.parse(ciphertext) }), C.enc.Hex.parse(strKey), { mode: C.mode.ECB, padding: C.pad.Pkcs7 }).toString()

console.log(ciphertext, '---', result)