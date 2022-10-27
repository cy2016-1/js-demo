// 闭包：指的是那些引用了另一个函数作用域中变量的函数
function func1(propertyName) {
    // 闭包
    return (name) => {
        return name === propertyName
    }
}

function func2(propertyName) {
    if (!propertyName) {
        return null
    }
    // 不是闭包
    return (name) => {
        return name
    }
}
func1('1')
func2('1')