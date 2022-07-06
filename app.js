const Koa = require('koa');
const buildRouter = require('./routes/build');
const dotenv = require('dotenv')
dotenv.config()

const app = new Koa();

app.use(buildRouter.routes(), buildRouter.allowedMethods())

app.listen(3031, () => {
  console.log('server listen to 3031');
});
