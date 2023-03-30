
(() => {
    const _timeoutList = []
    const _intervalList = []
    const _setInterval = function(fn, time) {
        const id = Date.now() + Math.random().toString()
        _intervalList.push({
            fn,
            id,
            currTime: Date.now(),
            time
        })
        return id
    }
    const _clearInterval = function(id) {
        const index = _intervalList.findIndex(v => v.id === id)
        if (index >= 0) {
            _intervalList.splice(index, 1)
        }
        
    }
    const _setTimeout = function(fn, time) {
        const id = Date.now() + Math.random().toString()
        _timeoutList.push({
            fn,
            id: id,
            currTime: Date.now(),
            time
        })
        return id
    }
    const _clearTimeout = function(id) {
        const index = _timeoutList.findIndex(v => v.id === id)
        if (index >= 0) {
            _timeoutList.splice(index, 1)
        }
    }
    const _render = () => {
        _timeoutList.forEach(v => {
            if (Date.now() - v.currTime > v.time) {
                v.fn()
                _timeoutList.splice(_timeoutList.findIndex(item => item === v), 1)
            }
        })

        _intervalList.forEach(v => {
            if (Date.now() - v.currTime > v.time) {
                v.fn()
                v.currTime = Date.now()
            }
        })

        requestAnimationFrame(_render)
    }
    _render()

    window._setInterval = _setInterval
    window._clearInterval = _clearInterval
    window._setTimeout = _setTimeout
    window._clearTimeout = _clearTimeout
})()