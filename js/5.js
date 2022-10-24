/**
 * 简单发布订阅的实现
 */
const Event = {
    _listener: [],
    emit(name, data) {
        this._listener.forEach(v => {
            v.name === name && v.callback(data)
        })
    },
    on(name, callback) {
        this._listener.push({ name, callback })
    },
    off(name, fn) {
        this._listener = this._listener.filter((v, i) => {
            return !(v.name === name && (fn === v.callback || !fn))
        })
    }
}
const fn = (data) => {
    console.log(data)
}

Event.on('run', fn)
Event.on('run', () => {
    console.log(22)
})
Event.off('run', fn)
Event.emit('run', {a: 1})