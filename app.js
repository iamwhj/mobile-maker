const Koa = require('koa');
const buildRouter = require('./routes/build');
const indexRouter = require('./routes');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
dotenv.config();
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());

app.use(bodyParser());

app.use(koaBody({ multipart: true }));
app.use(buildRouter.routes(), buildRouter.allowedMethods());
app.use(indexRouter.routes(), indexRouter.allowedMethods());

app.listen(3031, () => {
  console.log('server listen to 3031');
});
