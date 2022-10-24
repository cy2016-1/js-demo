
/**
 * 深度拷贝函数
 */
const copyObject = (data) => {
    let copyData
    if (Array.isArray(data)) {
        copyData = []
        data.forEach(v => {
            copyData.push(copyObject(v))
        })
    } else if (typeof data === 'object') {
        copyData = {}
        for(let n in data) {
            copyData[n] = copyObject(data[n])
        }
    } else {
        return data
    }
    return copyData
}
const data1 = [
    {id: 'ID', name: '姓名', age: '年龄'},
    {id: 1, name: '张三', age: 18},
    {id: 2, name: '李四', age: 22, c: {a: 1}},
    {id: 3, name: '王五', age: 26}
]
const data2 = copyObject(data1)
console.log(data2)