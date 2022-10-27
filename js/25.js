/**
 * Promise
 */
const p1 = new Promise((resolve, reject) => {
    if (true) {
        resolve(1)
    } else {
        reject(-1)
    }
})
const p2 = Promise.resolve(1)
p1.then(v => {
    console.log(v)
}).catch(err => {
    console.log(err)
})


// 场景1: 等待 wait(1000).then(res => {console.log('等待了1秒')})
const wait = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}
// 场景2：fetch、axios请求
const request = (url) => {
    return fetch(url)
}
// 场景3：在页面上一直等待某个dom出现 waitFindDom('.xxx').then(res => {console.log('找到了')})
const waitFindDom = (selector, config = {timeout: 0}) => {
    let timeId
    const find = (resolve, reject) => {
        const el = document.querySelector(selector)
        if (el) {
            resolve()
        } else {
            timeId = setTimeout(() => find(resolve, reject), 500)
        }
    }
    return new Promise((resolve, reject) => {
        find(resolve, reject)
        if (config.timeId > 0) {
            setTimeout(() => {
                clearTimeout(timeId)
                reject()
            }, timeout)
        }
    })
}

const test1 = () => {
    return p1
}
// 直接返回一个promise对象
const test2 = () => {
    return p2
}
// 同时执行多个 Promise.all([wait(1000), wait(1000), wait(3000)]).then(res => console.log(`等待了${res}秒`))
const test3 = () => {
    return Promise.all([
        test1(),
        test2()
    ])
}

test3().then(res => {

}).catch(err => {
    
})



// async 和 await

// async 写法，加了async关键字后，return的值都是promise对象
const _test1 = async () => {
    return 1
}
// promise写法，与上面等价
const _test2 = () => {
    return Promise.resolve(1)
}
// 常规写法
test2().then((res2) => {
    test3().then(res3 =>{

    }).catch(e => {

    })
}).catch(e => {

})
// 使用await之前，方法必须加async关键字
;(async () => {
    // await 可以让代码顺序执行，看起来更易懂
    try {
        const res2 = await test2()
        const res3 = await test3()
    } catch(err) {
        console.log(err)
    }
    

    for(let i=0;i < 5;i++) {
        await wait(1000)
        console.log(i)
    }
})()