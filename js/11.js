/**
 * 函数的使用
 */

const func1 = () => {

}
function func2() {
    return () => {

    }
}
const func3 = new Function('a', 'return a')
func3('111')
func2()()