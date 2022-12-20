class MyElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const iframe = document.createElement('iframe')
    iframe.src = 'about:blank'
    iframe.setAttribute('frameborder', '0')
    iframe.onload = () => this.onIfrLoad(iframe)
    this.shadow.appendChild(iframe)
  }
  onIfrLoad(ifr) {
    const me = this
    const doc = ifr.contentWindow.document
    doc.body.setAttribute('style', 'margin:0;')
    doc.body.innerHTML = `<img width="${me.getAttribute('width')}" width="${me.getAttribute('height')}" src="${me.getAttribute('src')}" alt=" width="${me.getAttribute('alt')}"">`
    doc.body.querySelector('img').onload = function() {
        me.width = ifr.width = this.width
        me.height = ifr.height = this.height
        
    }
}
}
//注册自定义组件
window.customElements.define('img-cors', MyElement);