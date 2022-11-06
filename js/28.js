/**
 * 出一道逻辑题
 * 给出一组数字，例如1,2,3
 * 打印出所有的数字的组合：1,2,3,12,13,23,123
 * 分析：
 * 循环规律分析：
 * 123 ->
 * 1 12 13
 * 2 23
 * 3
 * 1234 ->
 * 1 12 13 14 / 123 124 / 134 / 1234
 * 2 23 24 / 234
 * 3 34
 * 4
 * 
 */
const arr = [1, 2, 3, 4, 5]
const result = []
const loop = (arr, i, prev) => {
    if (i < arr.length - 1) {
        for(let j=i+1;j<arr.length;j++) {
            const list = prev.concat(arr[j])
            result.push(list.join(''))
            loop(arr,j,list)
        }
    }
}
for(let i=0;i<arr.length;i++) {
    result.push(arr[i].toString())
    loop(arr, i, [arr[i]])
}
console.log(result)

// const arr = [1, 2, 3, 4, 5];
const set = new Set();
let count2 = 0
for (let i = 1; i <= arr.length; i++) {
  for(let k=0;k<arr.length;k++) {
    recursion('', k, i);
  }
}
function recursion(text, curIndex, targetLength) {
  if (text.length === targetLength || arr[curIndex] === undefined) {
    count2++
    return set.add(text)
  } else {
    for (let i = curIndex + 1; i <= arr.length; i++) {
      count2++
      recursion(text + String(arr[curIndex]), i, targetLength);
    }
  }
}
// for (let value of set) {
//   console.log(value)
// }
console.log([...set].length, count2)