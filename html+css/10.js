class My {
    /**
     * 虚拟dom
     */
    vm = []
    /**
     * 根节点dom
     */
    elRoot 
    /**
     * 生命周期以及methods相关
     */
    obj
    /**
     * 配置
     */
    config
    constructor(selector, config) {
        const el = document.querySelector(selector)
        const me = this
        this.elRoot = el
        // 初始化配置对象
        this.obj = {
            data: config.data(),
            setData(data) {
                for(let n in data) {
                    this.data[n] = data[n]
                }
                me.renderVm(me.vm, data)
            },
            onload: config.onload,
            ...config.methods
        }
        // 修改methods中的this指向
        Object.values(config.methods).forEach(v => v.bind(this.obj))
        this.config = config
        // 生成虚拟dom
        this.vm = this.toVm(el)
        // 渲染虚拟dom
        me.renderVm(me.vm)
        
        this.obj.onload && this.obj.onload()
        return this.obj
    }
    // 执行表达式
    jsRun(scriptStr, data = {}) {
        const func =  new Function(
            ...Object.keys(this.obj.data), 
            ...Object.keys(this.config.methods),
            ...Object.keys(data),
            `return ${scriptStr}`
        )

        return func.call(this, 
            ...Object.values(this.obj.data), 
            ...Object.values(this.config.methods),
            ...Object.values(data)
        )
    }
    // 清除属性 
    clearTemplateAttrs(n) {
        const removeAttrs = []
        for(let i=0;i<n.attributes.length;i++) {
            const name = n.attributes[i].nodeName
            if (name.match(/^(v-|:|@).*/)) {
                removeAttrs.push(name)
            }
        }
        removeAttrs.forEach(v => {
            n.removeAttribute(v)
        })
    }
    // 获取模版中使用到了哪些data数据
    getUseData(template) {
        const useData = []
        template.replace(/([^a-z0-9_])?([a-z0-9_]+)/ig, (a, b, c) => {
            if (!b || b.match(/[^a-z0-9_]/) && isNaN(c)) {
                useData.push(c)
            }
        })
        return useData
    }
    // 检查模版中是否包含了更新的数据字段，决定是否更新该处dom
    checkUseData(newKeys, useData) {
        if (newKeys.length === 0 || !useData) {
            return true
        }
        const result = useData.filter(v => {
            return newKeys.indexOf(v) >= 0
        }).length > 0
        return result
    }
    // 生成虚拟dom，初始化的时候执行一次
    toVm(el) {
        let nodes = []
        const loop = (list, nodes, vnode) => {
            
            for(let i=0;i<list.length;i++) {
                const children = []
                const attrs = list[i].attributes
                const ifData = []
                let showData
                let forData
                const myAttrs = []
                const events = {}
                const textNodes = []
                const el = list[i]
                const childNodes = el.childNodes
                for (let j=0;j<attrs.length;j++){
                    const n = attrs[j]
                    if (n.nodeName.indexOf('@') === 0) {
                        const eventName = n.nodeName.substring(1)
                        const eventFunc = () => {
                            this.obj[n.nodeValue].call(this.obj)
                        }
                        events[eventName] = events[eventName] || []
                        events[eventName].push(eventFunc)
                        el.addEventListener(eventName, eventFunc)
                    } else if (n.nodeName.indexOf(':') === 0) {
                        const key = n.nodeName.substring(1)
                        myAttrs.push({
                            name: key,
                            useData: this.getUseData(n.nodeValue),
                            template: n.nodeValue
                        })
                    } else if (n.nodeName === 'v-if') {
                        ifData.push({
                            useData: this.getUseData(n.nodeValue),
                            el,
                            type: 'if',
                            template: n.nodeValue
                        })
                        let next = el.nextElementSibling
                        let elseUseData = []
                        ifData[ifData.length - 1].useData.forEach(k => {
                            elseUseData.indexOf(k) === -1 && elseUseData.push(k)
                        })
                        while(next) {
                            const velif = next.getAttribute('v-else-if')
                            const velse = next.getAttribute('v-else')
                            if (velif !== null) {
                                ifData.push({
                                    useData: this.getUseData(velif),
                                    el: next,
                                    type: 'else-if',
                                    template: velif
                                })
                                ifData[ifData.length - 1].useData.forEach(k => {
                                    elseUseData.indexOf(k) === -1 && elseUseData.push(k)
                                })
                            } else if (velse !== null) {
                                ifData.push({
                                    el: next,
                                    useData: elseUseData,
                                    type: 'else',
                                    template: velse
                                })
                            } else {
                                break;
                            }
                            next = next.nextElementSibling
                        }
                    } else if (n.nodeName === 'v-show') {
                        showData = {
                            useData: this.getUseData(n.nodeValue),
                            template: n.nodeValue
                        }
                    } else if (n.nodeName === 'v-for') {
                        forData = {
                            useData: this.getUseData(n.nodeValue),
                            template: n.nodeValue
                        }
                    }
                }
                this.clearTemplateAttrs(el)
                for(let i=0; i<childNodes.length; i++) {
                    const node = childNodes[i]
                    if (node.nodeType === 3) {
                        textNodes.push({
                            useData: this.getUseData(node.nodeValue),
                            template: node.nodeValue
                        })
                    }
                }
                const vn = {
                    el,
                    parent: vnode ||  { el: this.elRoot, isRoot: true},
                    event: events,
                    attrs: myAttrs,
                    showData,
                    forData,
                    forEls: [],
                    ifData,
                    textNodes,
                    children
                }
                nodes.push(vn)
                loop(el.children, children, vn)
            }
        }
        loop([el], nodes)
        return nodes
    }
    renderItem(v, newKeys, ii) {
        // 解析v-if
        if (v.ifData.length) {
            let result
            const parentEl = v.parent.el
            if (!v.ifPositionEl) {
                const textNode = document.createTextNode('')
                parentEl.insertBefore(textNode, v.ifData[0].el)
                v.ifPositionEl = textNode
            }
            
            v.ifData.forEach(k => {
                
                if (this.checkUseData(newKeys, k.useData)) {
                    if (result) {
                        parentEl.contains(k.el) && parentEl.removeChild(k.el)
                        return
                    }
                    if (k.type === 'else') {
                        result = true
                    } else {
                        result = this.jsRun(k.template, v.forItem)
                    }
                    if (!result) {
                        parentEl.contains(k.el) && parentEl.removeChild(k.el)
                    } else {
                        parentEl.insertBefore(k.el, v.ifPositionEl)
                    }
                }
            })
        }
        // 解析v-show
        if (v.showData && v.showData.template) {
            if (this.checkUseData(newKeys, v.showData.useData)) {
                const result = this.jsRun(v.showData.template, v.forItem)
                if (result) {
                    v.el.style.display = ''
                } else {
                    v.el.style.display = 'none'
                }
            }
        }
        // 解析属性
        v.attrs.forEach(k => {
            if (this.checkUseData(newKeys, k.useData)) {
                v.el.setAttribute(k.name, this.jsRun(k.template, v.forItem))
            }
        })
        
        const nodes = this.getTextNodes(v.el.childNodes)
        
        // 渲染内容
        v.textNodes.forEach((k, i) => {
            if (this.checkUseData(newKeys, k.useData)) {
                
                if (k.template.match(/\{\{(.*?)\}\}/)) {
                    const val = k.template.replace(/\{\{(.*?)\}\}/g, (a, b) => {
                        return this.jsRun(b, v.forItem)
                    })
                    if (nodes[i].nodeValue !== val) {
                        nodes[i].nodeValue = val
                    }
                    
                }
            }
        })
    }
    getTextNodes(childNodes) {
        const arr = []
        for(let i=0;i<childNodes.length;i++) {
            childNodes[i].nodeType === 3 && arr.push(childNodes[i])
        }
        return arr
    }
    checkRenderFor(v, newKeys) {
        const forAllUseData = []
        const loop = (v) => {
            v.children.forEach((k, i) => {
                if (k.forData?.useData) {
                    k.forData.useData.forEach(m => {
                        forAllUseData.indexOf(m) === -1 && forAllUseData.push(m)
                    })
                    
                }
                k.attrs.forEach(m => {
                    m.useData.forEach(n => {
                        if (forAllUseData.indexOf(m) === -1) {
                            forAllUseData.push(n)
                        }
                    })
                })
                k.textNodes.forEach(m => {
                    m.useData.forEach(n => {
                        if (forAllUseData.indexOf(m) === -1) {
                            forAllUseData.push(n)
                        }
                    })
                })
                loop(k)
            })
        }
        loop({ children: [v]})
        if(!this.checkUseData(newKeys, forAllUseData)) {
            return false
        }
        return true
    }
    // 数据更新，重新渲染虚拟dom
    renderVm(list, newData) {
        let newKeys = []
        if (newData) {
            newKeys = Object.keys(newData)
        }
        list.forEach(v => {
            // for循环单独处理
            if (v.forData) {
                if (!this.checkRenderFor(v, newKeys)) {
                    return
                }
                const { useData } = v.forData
                const inIndex = useData.indexOf('in')
                const listData = this.obj.data[useData[useData.length - 1]]
                const parentEl = v.parent.el
                let prevEl
                if (!parentEl.insertNode) {
                    parentEl.insertNode = document.createTextNode('')
                    parentEl.insertBefore(parentEl.insertNode, v.el)
                    parentEl.removeChild(v.el)
                }
                v.forEls.forEach(k => {
                    if (parentEl.contains(k)) {
                        parentEl.removeChild(k)
                    }
                    
                })
                v.forEls = []
                
                listData.forEach((n, i) => {
                    const forItem = {
                        ...v.forItem,
                        [useData[0]]: n,
                    }
                    if (inIndex === 2) {
                        forItem[useData[1]] = i
                    }
                    let el = v.el.cloneNode(true)
                    parentEl.insertBefore(el, prevEl || parentEl.insertNode)
                    parentEl.insertBefore(prevEl || parentEl.insertNode, el)
                    v.forEls.push(el)
                    prevEl = el
                    
                    const copyV = {
                        ...v,
                        forItem,
                        el
                    }
                    const loop = (v, el, copyV) => {
                        v.children.forEach((k, i) => {
                            k.el = el.children[i]
                            k.forItem = forItem
                            k.parent = copyV
                            loop(k, k.el)
                        })
                    }
                    loop(v, el, copyV)
                    this.renderItem(copyV, [...newKeys, ...Object.keys(forItem)], 2)
                    this.renderVm(copyV.children, newData)
                })
            } else { 
                this.renderItem(v, newKeys)
                this.renderVm(v.children, newData)
            }
        })
    }
}