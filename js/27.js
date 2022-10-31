/**
 * 事件循环：js是单线程的，但是又需要一种机制来处理多个块的执行，
          且执行每个块时调用js引擎，这种机制称为事件循环，与事件绑定概念毫无关系
 * 事件循环分3部分：主线程、宏队列、微队列，异步代码都会被丢进宏/微队列
 * --宏任务：script, setTimeout, setInterval, setImmeditate, I/O, UI rendering
 * --微任务：process.nextTick, promise.then(), object.observe, MutationObserver
 * 主线程只有一个，且执行顺序为：
 *  1、先执行主线程
 *  2、遇到宏任务放到宏队列
 *  3、遇到微任务放到微队列
 *  4、主线程执行完毕
 *  5、执行微队列，微队列执行完毕
 *  6、执行一次宏队列的任务，执行完毕
 *  7、执行微队列，执行完毕
 *  8、依次循环...
 */

  Promise.resolve().then(()=>{
    console.log('Promise1') 
    setTimeout(()=>{
      console.log('setTimeout2')
    },0)
  });
  setTimeout(()=>{
    console.log('setTimeout1')
    Promise.resolve().then(()=>{
      console.log('Promise2')    
    })
  },0);
  console.log('start');
  
  // start
  // Promise1
  // setTimeout1
  // Promise2
  // setTimeout2