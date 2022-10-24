/**
 * js中的数据转换
 * parseInt: 将其他进制字符串转换为10进制
 * toString: 可将数字转换为其他进制
 * Math.ceil: +1取整，如4.1会得到5
 * Math.floor: -1取整，如4.1会得到4
 * Math.round: 四舍五入
 * toLocaleString: 本地化
 */
const result1 = parseInt('f', 16)
const result2 = (15).toString(16)
const result3 = Math.ceil(4.1)
const result4 = Math.floor(4.6)
const result5 = Math.round(4.6)
const result6 = (10800044).toLocaleString()
const result7 = new Date().toLocaleDateString()
console.log(result7)