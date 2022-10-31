// 获取加减乘除所有的组合方式
const getCalc = () => {
    const calcTypes = ['+', '-', '*', '/']
    const calcArr = [0, 0, 0]
    const calcAll = []
    for(let i=0;i<calcArr.length;i++) {
        for(let j=0;j<calcArr.length;j++) {
            for(let k=0;k<calcTypes.length;k++) {
                calcAll.push([calcTypes[i], calcTypes[j], calcTypes[k]])
            }
        }
    }
    return calcAll
}
const check24 = (data, v) => {
    data.splice(1, 0, v[0])
    data.splice(3, 0, v[1])
    data.splice(5, 0, v[2])
    const math = data.join('')
    return {
        value: new Function(`return ${math}`)(),
        math: math
    }
}
const getResult = (number) => {
    const numberArr = number.toString().split('').map(v => Number(v))
    const calcAll = getCalc()
    const mathList = []
    for(let i=0;i < numberArr.length;i++) {
        for(let j=0;j<numberArr.length - 1;j++) {
            let next = numberArr[j+1]
            numberArr[j+1] = numberArr[j]
            numberArr[j] = next
            // numberArr = 等于4个数的每一种的组合方式
            calcAll.every(v => {
                const result = check24([...numberArr], v)
                if (result.value === 24) {
                    mathList.push(result.math)
                }
                return true
            })
            
        }
    }
    return mathList
}
// const filterData = (result) => {
//     let obj = {}
//     return result.reduce((prev, curr) => {
//         const list1 = curr.split('*').filter(v => Number(v)).sort().join('')
//         const list2 = curr.split('+').filter(v => Number(v)).sort().join('')
//         if (list1.length === 3) {
//             if (!obj[list1]) {
//                 prev.push(curr)
//             }
//             obj[list1] = true
//         } else  if (list2.length === 3) {
//             if (!obj[list2]) {
//                 prev.push(curr)
//             }
//             obj[list2] = true
//         }
//         return prev
//     }, [])
// }
// const result = getResult(1234)
// console.log(result, filterData(result))

// const allTrueNumbers = []
// for(let i=1111;i<9999;i++) {
//     const result = getResult(i)
//     if (result.length > 0) {
//         allTrueNumbers.push(i)
//     }
// }
// console.log(allTrueNumbers)


