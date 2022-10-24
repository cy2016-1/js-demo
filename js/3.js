
/**
 * 极简的导出excel的js代码
 * 打开chrome控制台，复制粘贴运行即可
 */
var download = (data, name) => {
    const a = document.createElement('a')
    const result = data.map(v => (`${v.id}\t${v.name}\t${v.age}`)).join('\n')
    a.href = URL.createObjectURL(new Blob([result]))
    a.setAttribute('download', name)
    a.click()
}
download([
    {id: 'ID', name: '姓名', age: '年龄'},
    {id: 1, name: '张三', age: 18},
    {id: 2, name: '李四', age: 22},
    {id: 3, name: '王五', age: 26}
], '用户信息.xls')