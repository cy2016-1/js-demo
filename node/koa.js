const Koa = require('koa')
const fs = require('fs')
const static = require('koa-static')
const koaBody = require('koa-body')
const router = require('koa-router')()
const cors = require('koa-cors')
const app = new Koa()

app.use(cors())
app.use(
	static(__dirname + '/public', {
		index: false,
		defer: true
	})
)
app.use(koaBody.koaBody({ multipart: true }))

router.get('/52.html', async ctx => {
    ctx.body = fs.readFileSync(__dirname + '/../html+css/52.html').toString('utf-8')
})
router.post('/api/send-file', async (ctx) => {
	const ff = ctx.request.files.file
	if (ff) {
        await new Promise(resolve => {
            const reader = fs.createReadStream(ff.filepath)
            const upStream = fs.createWriteStream(__dirname + '/files/' + ff.originalFilename)
            reader.pipe(upStream);
            reader.on('close', () => {
                console.log(ff)
                resolve()
            })
        })
	}
    ctx.body = {
        status: 200
    }
	
})
app.use(router.routes())

app.listen(3000, (err) => {
	if (err) {
		console.error(err)
	} else {
		console.log(`http://127.0.0.1:3000/52.html`)
	}
})
