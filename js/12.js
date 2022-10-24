const json = {
    a: 'a',
    b: /\d/,
    c: () => {}
}
const moreJson = JSON.stringify(json, (key, value) => {
    if (value.constructor === RegExp) {
        return 'RegExp:' + value.toString()
    } else if (value.constructor === Function) {
        return 'Function'+value.toString()
    }
    return value
})
console.log(moreJson)

console.log(JSON.parse(moreJson, (key, value) => {
    if (typeof value === 'string' && value.indexOf('RegExp:') >= 0) {
        return new RegExp(value.substring(7))
    } else if (typeof value === 'string' && value.indexOf('Function:') >= 0) {
        return new RegExp(value.substring(7))
    }
    return value
}))