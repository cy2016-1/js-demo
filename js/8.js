let str = '在一个阳光明媚的早晨，{name}起床，冲了一杯{drink}，喝完{drink}，{name}感觉棒极了'
const data = {
    name: '小明',
    drink: '牛奶'
}
str = str.replace(/\{([^}]+)\}/g, (a, b) => {
    return data[b]
})
console.log(str)


let htmlStr = '<div>大家好<img src="http://www.baidu.com/xxx.jpg" /></div>'

htmlStr = htmlStr.replace(/<img[^>]+>/g, '')

console.log(htmlStr)