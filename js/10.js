/**
 * 将字符串当作js进行执行
 * js表达式：eval
 * 动态函数：new Function
 */

const code1 = `new Date()`
const code2 = `return a+':'+new Date()`
console.log(eval(code1))
const func = new Function('a', code2)

console.log(func('时间'))