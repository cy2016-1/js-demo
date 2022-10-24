// JSON
const obj = {
    a: 1,
    b: 2
}
// Map
const map = new Map()
map.set('a', 1)
map.set({a: 1}, 1)

//Set
const set = new Set()
set.add(1)
set.add(2)

// 生成器
const getVal = (function* get() {
    yield 1
    yield 2
})()

// 数组
const arr = new Array(6)

for(let n of arr) {
    console.log(n)
}
// 任何可迭代的结构，即实现了Iterable结构的对象
const result = Array.from(getVal)
// console.log(result.forEach(k => console.log(1)))
// console.log(result)