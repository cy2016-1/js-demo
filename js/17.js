/**
 * js基础查漏补缺
 * var
 * == ===
 * + - 运算符
 * class与prototype的关系
 * typeof instanceof
 * 数组中的every / reduce
 * 
 */
// ;(() => {
//     var a
//     // var存在变量提升，项目中不要使用var
//     console.log(a)
//     if (true) {
//         a = 1
//     }
//     a++
//     console.log(a)
// })()

;(() => {
    // == 在比较的时候会试图类型转换
    // === 会对值进行比较，项目中建议一律用 ===
    // console.log('' == 0) // true
    // console.log(false == 0, true == 1) // true true
    // console.log(undefined == null) // true
    // console.log('1' == 1) // true
    // console.log([] == 0) // true

    // 加法计算的时候也会试图进行类型转换
    // console.log(true + false) // 1
    // console.log(true + 1) // 2
    // console.log([] + 1) // 1
})()

;(() => {
    // // ES6写法
    // class Person {
    //     name
    //     constructor(name) {
    //         this.name = name
    //     }
    //     getName() {
    //         return this.name
    //     }
    // }
    // // ES5写法
    // function Person2(name) {
    //     this.name = name
    // }
    // Person2.prototype = {
    //     getName() {
    //         return this.name
    //     }
    // }

    // console.log(new Person('张三').getName(), new Person2('李四').getName())
})()

;(() => {
    // typeof 是用来检测基础数据类型的，像Array、Map、RegExp等都不属于基础数据类型
    // console.log(typeof [], Object.prototype.toString.call([]))
    // instanceof 检测Array是否在arr1实例对象的原型链上
    // const a1 = Symbol(1)
    // const a2 = Symbol(1)
    // console.log(a1 === a2)
    // const arr1 = []
    // console.log(arr1 instanceof Array)
    // class MyArray extends Array {
    //     constructor(v) {
    //         super(v)
    //     }
    // }
    // const arr2 = new MyArray(1)
    // console.log(arr2 instanceof MyArray)
})()

;(() => {
    // every
    const arr1 = [1, 2, 3]
    // 只要遍历中执行了一次return false，那么everyResult就等于false，否则就为true
    const everyResult = arr1.every(v => {
        if (v === 1) {
            return false
        }
        return true
    })
    // console.log(everyResult)
    /**
     * prev: 上一个值
     * curr：当前值
     * index：当前索引
     * arr：原数组
     */
    const reduceResult = arr1.reduce((prev, curr, index, arr) => {
        return prev + curr
    })
    
    const arr2 = [{a: 1}, {a: 2}, {a: 3}]
    const reduceResult2 = arr2.reduce((prev, curr, index, arr) => {
        return prev + curr.a
    }, 0)
    // console.log(reduceResult2)
})()

function* get() {
    yield 1
}
const k = get()
for(const n of k) {
    console.log(n)
}