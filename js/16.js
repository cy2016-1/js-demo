var C = require("crypto-js")
// 需要加密的字符串
const str = new Date('2023-01-01').getTime().toString()
// 密码
const pwd = '9ea414bd183d5a11'
// 加密
const ciphertext = C.AES.encrypt(str, C.enc.Utf8.parse(pwd), {
  mode: C.mode.ECB,
  padding: C.pad.Pkcs7,
}).toString()
console.log(`https://xxx.xxx.xxx/xxx?expireTime=${ciphertext}`)
// 解密
const result = C.AES.decrypt({
    ciphertext: C.enc.Base64.parse(ciphertext)
}, C.enc.Utf8.parse(pwd), {
    mode: C.mode.ECB, 
    padding: C.pad.Pkcs7
}).toString(C.enc.Utf8)
console.log('加密', ciphertext)
console.log('解密', result, str)