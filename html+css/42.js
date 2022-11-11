class PostMessage {
    callList = []
    parentPath = ''
    postParentList = []
    postIframeList = []
    ifr = null
    openWin = null
    openUrl = ''
    constructor() {
        
    }
    connect(pt) {
        this.pt = pt
        return new Promise((resolve, reject) => {
            window.addEventListener("message", evt => {
                const { type, data } = evt.data
                this.callList.filter(v => v.name === type).forEach(v => {
                    this.pt.postMessage({
                        type: v.name,
                        data: v.call(data)
                    }, this.parentPath)
                })
                this.postParentList.filter(v => v.name === type).forEach(v => {
                    v.resolve(data)
                    this.postParentList.splice(this.postParentList.indexOf(v), 1)
                })
                if (top !== window && type === 'sendUrl') {
                    this.parentPath = data
                    resolve(this)
                }
            }, false)
            if (top === window) {
                this.parentPath = pt.location.href
                resolve(this)
            }
        })
    }
    postParent(name, params) {
        return new Promise((resolve) => {
            this.postParentList.push({
                name,
                resolve
            })
            
            this.pt.postMessage({
                type: name,
                data: params
            }, this.parentPath)
        })
    }
    postIframe(name, params) {
        return new Promise((resolve) => {
            this.postIframeList.push({
                name,
                resolve
            })
            this.openWin.postMessage({
                type: name,
                data: params
            }, this.openUrl)
        })
    }
    create(ifr) {
        this.ifr = ifr
        return new Promise((resolve) => {
            ifr.addEventListener('load', e => {
                this.openWin = ifr.contentWindow ? ifr.contentWindow : ifr
                this.openUrl = ifr.src || ifr.location.href
                this.openWin.postMessage({
                    type: 'sendUrl',
                    data: location.href
                }, this.openUrl)
                resolve(this)
            })
            window.addEventListener('message', evt => {
                const { type, data } = evt.data
                this.postIframeList.filter(v => v.name === type).forEach(v => {
                    v.resolve(data)
                    this.postIframeList.splice(this.postIframeList.indexOf(v), 1)
                })
                for(const n of this.callList) {
                    if (type === n.name) {
                        this.openWin.postMessage({
                            type: n.name,
                            data: n.call(data)
                        }, this.openUrl)
                    }   
                }
            }, false)
        })
    }
    register(path, call) {
        this.callList.push({
            name: path,
            call: call
        })
    }
}