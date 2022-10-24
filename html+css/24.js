class Draw {
    images = {}
    cvs
    ctx
    renderList
    bl = 2
    constructor(config) {
        this.cvs = config.el
        this.bl = config.bl
        this.ctx = cvs.getContext('2d')
        this.cvs.width = this.cvs.width * this.bl
        this.cvs.height = this.cvs.height * this.bl
        this.renderList = config.renderList
        this.draw()
    }
    // 绘制函数
    async draw() {
        const { ctx, renderList } = this
        const urls = renderList.filter(v => v.type === 'image').map(v => v.src)
        await this.loadImgs(urls)
        renderList.forEach(v => {
            v.align && (ctx.textAlign = v.align)
            if (v.type === 'image') {
                ctx.beginPath()
                ctx.save()
                if (v.clipCircle) {
                    ctx.lineWidth = v.clipLineWidth
                    ctx.strokeStyle = v.clipStrokeStyle
                    ctx.arc((v.x+v.width/2)*this.bl, (v.y+v.width/2)*this.bl, v.width/2*this.bl, 0, Math.PI * 2)
                    ctx.stroke()
                    ctx.clip()
                }
                
                ctx.drawImage(this.images[v.src], v.x*this.bl, v.y*this.bl, v.width*this.bl, v.height*this.bl)
                ctx.restore()
            } else if (v.type === 'text') {
                ctx.fillStyle = v.fillStyle
                ctx.font = `${v.fontSize * this.bl}px 宋体`
                ctx.fillText(v.text, v.x*this.bl, v.y*this.bl)
            }
        })
    }
    // 加载多张图
    async loadImgs(urls) {
        for(let i=0;i<urls.length;i++) {
            await this.loadImg(urls[i])
        }
    }
    // 加载单张图
    async loadImg(url) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
                this.images[url] = img
                resolve()
            }
        })
    }
}