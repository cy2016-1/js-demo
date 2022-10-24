
/**
 * 深度拷贝函数，支持循环引用
 */
const copyObject = (data, hash = {}) => {
    if (typeof data === 'object' && data) {
        if (hash[data]) {
            return hash[data]
        }
        if (!['Array', 'Object'].includes(data.constructor.name)) {
            const obj = new data.constructor()
            const attrs = Object.create(data)
            let prototypeObj = obj
            while(prototypeObj) {
                for(let n in prototypeObj) {
                    console.log(n)
                }
                prototypeObj = prototypeObj.__proto__
            }
            return obj
        }
        const copyData = Array.isArray(data) ? [] : {}
        hash[copyData] = copyData
        for(let n in data) {
            copyData[n] = copyObject(data[n], hash)
        }
        return copyData
    } else {
        return data
    }
}

const data1 = [
    {c: new Date(1632625485685)}
]
// data1[0].data = data1
const data2 = copyObject(data1)
console.log(data1[0].c,  data2[0].c)