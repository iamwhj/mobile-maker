const Koa = require('koa')

const app = new Koa()

app.listen(3031, () => {
    console.log('server listen to 3031');
})