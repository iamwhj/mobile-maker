import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import './plugins/dotenv'
import connectDB from './db'
import { generateRouter } from './utils/generate'
import { resolve } from 'path'

const app = new Koa()

app.use(bodyParser())

// 连接数据库
connectDB()

// 自动生成路由
generateRouter(app, resolve(__dirname, './routes/'))

app.listen(process.env.PORT, () => {
  console.log('server listener to ' + process.env.PORT)
})
