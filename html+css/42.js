const PostMessage = {
    callList: [],
    parentPath: '',
    postParentList: [],
    postIframeList: [],
    ifr: null,
    connect(pt) {
        return new Promise((resolve, reject) => {
            window.addEventListener("message", evt => {
                const { type, data } = evt.data
                this.callList.filter(v => v.name === type).forEach(v => {
                    window.parent.postMessage({
                        type: v.name,
                        data: v.call(data)
                    }, this.parentPath)
                })
                this.postParentList.filter(v => v.name === type).forEach(v => {
                    v.resolve(data)
                })
                if (type === 'sendUrl') {
                    this.parentPath = data
                    resolve()
                }
            }, false)
        })
    },
    postParent(name, params) {
        return new Promise((resolve) => {
            this.postParentList.push({
                name,
                resolve
            })
            window.parent.postMessage({
                type: name,
                data: params
            }, this.parentPath)
        })
    },
    postIframe(name, params) {
        return new Promise((resolve) => {
            this.postIframeList.push({
                name,
                resolve
            })
            this.ifr.contentWindow.postMessage({
                type: name,
                data: params
            }, this.ifr.src)
        })
    },
    create(ifr) {
        this.ifr = ifr
        return new Promise((resolve) => {
            ifr.addEventListener('load', e => {
                ifr.contentWindow.postMessage({
                    type: 'sendUrl',
                    data: location.href
                }, ifr.src)
                resolve()
            })
            window.addEventListener('message', evt => {
                const { type, data } = evt.data
                this.postIframeList.filter(v => v.name === type).forEach(v => {
                    v.resolve(data)
                })
                for(const n of this.callList) {
                    if (type === n.name) {
                        iframe1.contentWindow.postMessage({
                            type: n.name,
                            data: n.call(data)
                        }, iframe1.src)
                    }   
                }
            }, false)
        })
    },
    register(path, call) {
        this.callList.push({
            name: path,
            call: call
        })
    }
}