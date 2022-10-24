/**
 * js数组的遍历函数
 * forEach: 便利数组
 * every: 便利数组，返回值遇到false时遍历终止
 * map: 修改并返回新数组
 * fill
 * filter: 过滤并返回新数组
 * find: 找到并返回数组元素
 * findIndex: 找到并返回元素索引
 * some: 是否存在某个元素
 * flatMap: 拉平数组
 * reduce: 求和
 * 
 */
const arr = [1, 2, 3]
console.log(arr.reduce((sum, v) => {
    return sum + v
}))