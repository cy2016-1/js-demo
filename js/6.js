/**
 * \d 数字等价[0-9]
 * \s 空白符包括换行
 * \S 非空白符
 * \n 换行
 * \w 等价 [A-Za-z0-9_]
 * \W 等价 [^A-Za-z0-9_]
 * . 匹配除换行符（\n、\r）之外的任何单个字符，相等于 [^\n\r]
 * * 任意长度，等价{0,}
 * + 长度大于1位，等价{1,}
 * ? 长度0-1位，等价{0,1}
 * [] 组合[0-9] 表示0-9，[0-9a-z.$] 表示0-9或者a-z或者.或者$
 * {} 长度限制{0,5}表示长度0-5，{5}表示长度5，{1,}表示长度大于1
 * ^ 以什么开头，如果出现在[]中，那么表示非，取反的意思
 * $ 以什么结尾
 * [\u4e00-\u9fa5] 匹配中文
 * () 分组
 * .*?  非贪婪匹配，找到一个就停止，例如/\d.*?/ 匹配到第一个数字就停止
 */
  
 /* 
 * 校验手机号/座机号
 * 校验4位手机验证码
 * 校验邮箱输入
 * 身份证号验证
 * 校验名字必须位中文
 * unicode与实体字符
 * 获取url参数
 * 过滤html标签
 * 字符串模板
 * 数据格式化
 * 去除多余的空格
 */

// const telphone = '13333333333'
// console.log(/^1\d{10}$/.test(telphone))
// const telphone = '020-88888888'
// console.log(/^\d{3}-\d{8}$/.test(telphone))
// const code = '4564'
// console.log(/^\d{4}$/.test(code))
// const email = 'q15555555@qq.com'
// console.log(/^[a-z0-9_]{1,20}@[a-z0-9]{1,10}[.a-z0-9]+[^.]+$/i.test(email))
// const name = '张三'
// console.log(/^[\u4e00-\u9fa5]{2,5}$/.test(name))

// function querystring(url, key) {
//     const reg = new RegExp('a=(.*?)(&|$)')
//     const result = url.match(reg)
//     return result ? result[1] : null
// }
// console.log(querystring('http://xxx.xxx.com/?a=1&b=2', 'b'))
// const strHtml = `xxxxx<a href="https://www.baidu.com">baidu.com</a>
// <a href="https://abc.com">baidu.com</a>
// `

// console.log(strHtml.replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/g, (a, group1, group2) => {
//     return group1.indexOf('https://www.baidu.com') >= 0 ? group2: a
// }))

// const text = '{name}说，今天天气{desc}'
// const obj = {
//     name: '张三',
//     desc: '真好'
// }
// console.log(text.replace(/\{(.*?)\}/g, (a, group1) => {
//     return obj[group1]
// }))
const str2 = ' 你 好 '
console.log('--' + str2.replace(/^\s+|\s+$/g, '') + '--')

// console.log(/\W/.test('&'))
// 4e00-9fa5
// console.log('\u4e00', parseInt('4e00', 16), parseInt('9fa5', 16))
// console.log(/^[\u4e00-\u9fa5]+$/.test('你'))