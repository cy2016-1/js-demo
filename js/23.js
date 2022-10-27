/**
 * js 基础：函数与对象
 * json object 对象
 */
const obj = {
    a: 1
} 
// Object.defineProperty(obj,'a', {
//     // // 不可修改
//     // writable: false,
//     // // 赋值
//     // value: '222',
//     // // 不可被删除
//     // configurable: false
//     get () {
//         return 2
//     },
//     set (v) {
//         console.log(v)
//     }
// })
Object.defineProperties(obj, {
    _a: {
        writable: true,
        value: 2017
    },
    a: {
        set(v) {
            this._a = v
        },
        get() {
            return this._a
        }
    }
})
// obj.a = 2
// delete obj.a
obj.a = 3
// console.log(obj.a)

/**对象合并 */
Object.assign

/**可计算属性 */
obj['a'] = 2
// obj = {
//     [`a`]: 2
// }
/**结构语法 */
// const {} = this

/**创建对象 */
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = () => {
        console.log(this.name)
    }
}
const person1 = new Person('jack', 18, 'doctor')
// person1.sayName()

/**对象原型 */
Person.prototype.xx
/**继承 */
Person.prototype = new Object()


class P {
    static a = 4
    constructor() {

    }
}
const a = new P()
// console.log(P.a)
/**
 * 函数
 * bind call apply
 * arguments callee
 * 闭包：闭包指的是那些引用了另一个函数作用域中变量的函数
 * 递归
 */


