/* 
 * 判断元素是否是数组的5种方式 
 */
const arr = new Array()
// 非标准，部分浏览器不支持__proto__,例如ie
console.log(arr.__proto__ === Array.prototype)
// constructor可以被改变
arr.constructor = Number
console.log(arr.constructor === Array)
// 检查Array原型是否存在于arr对象实例的原型链上
console.log(arr instanceof Object)
// es6引入，低版本浏览器上可能不支持
console.log(Array.isArray(arr))
// 兼容性最好
console.log(Object.prototype.toString.call(arr)
     === '[object Array]')