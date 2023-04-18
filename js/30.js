// var rs = ['落英缤纷', '冲鸭', '情书', '加鸡腿', '吉兔灯', '这个好诶', '魔术笔']
// var gi = [0.2, 1.5, 6, 16.7, 19.99, 24.38, 31.23]
// var g = ['星河梦帆', '水月星河', '浪漫城堡', '微光奇缘', '电影票', '棉花糖', '闪耀之星']
// var gi = [0.05, 0.1, 0.24, 0.3, 14.95, 41.26, 43.1]
// var ggg = {
//     '星河梦帆': 100,
//     '水月星河': 50,
//     '微光奇缘': 20,
//     '浪漫城堡': 1116,
//     '闪耀之星': 8,
//     '棉花糖': 4.5,
//     '电影票': 1
// }
// for(let i=0;i<gi.length;i++) {
//     if (i > 0)gi[i] += gi[i-1]
// }
// gi = gi.map((v, i) => ({max: v, min: (i === 0 ? 0 : gi[i-1])}))
// const ll = 20
// let all = 0
// for(let j=0;j<1;j++) {
//     var result = {}
//     for(let i=0;i<ll;i++) {
//         const r = Math.random() * 100
//         const index = gi.findIndex(v => r > v.min && r <= v.max)
//         result[g[index]] = result[g[index]] || 0
//         result[g[index]]++
//     }
//     result = Object.keys(result).map((v, i) => {
//         all += ggg[v] * result[v]
//         return v + 'x' + result[v]
//     })
//     console.log(ll+'连开第'+(j+1)+'次：')
//     console.log(result)
// }
// console.log(`成本：${ll * 15}，收益：${all}`)

const gname = ['古堡', '巴士', '花车', '飞船']
const glNum = [1.7, 4.6, 20.8, 2.4]
const cb = [500, 100, 200, 200]
const jz = [28800, 2000, 1000, 8000]
const mb = [150, 15, 40, 95]
const index = 2
let gl = glNum[index] / 100
let sum = 0
let cs = 30
for(let j=0;j<1;j++) {
    let count = 0
    
    for(let i=0;i<cs;i++) {
        if (Math.random() < gl || (sum % mb[index] === 0 && sum > 0)) {
            count++
            sum++
        }
    }
    console.log(gname[index] + `${cs}连开${j+1}次`, count)
}
console.log(`投入电池：${cs * cb[index]}，收获${sum}个${gname[index]}，价值${jz[index] * sum}电池`)

