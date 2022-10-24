
/**
 * 保证请求一定发送成功，即使你关闭浏览器或退出应用
 * 以post形式发送数据，但无返回值
 * 可以用于关闭浏览器或退出应用的数据统计场景
 */
navigator.sendBeacon('https://abc.com/api/send-msg', 'a=1&b=2')

const formData = new FormData()
formData.append('title', '')
formData.append('file', new Blob([]))
navigator.sendBeacon('https://abc.com/api/send-msg', formData)