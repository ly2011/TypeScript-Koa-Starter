'use strict';
/**
 * 入口文件
 */
import { readFile } from 'fs';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as json from 'koa-json';
import * as BodyParser from 'koa-bodyparser';
// import * as config from 'config';
import * as logger from 'koa-logger';
const app = new Koa();
const router = new Router();
const bodyparser = BodyParser();
const port = process.env.PORT || 3000;

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());

// error handle
app.on('error', (err: Object, ctx: any) => {
  console.log('server error', err, ctx);
});

// 导入路由
import indexRouter from './routes/index';
import userRouter from './routes/user';

const read = (file: string) => {
  return new Promise((resolve, reject) => {
    readFile(file, (err, data) => {
      if (err) return reject(err);
      resolve(data.toString());
    });
  });
};

// logger
app.use(async (ctx, next) => {
  const start = new Date().getMilliseconds();

  await next();
  const ms = new Date().getMilliseconds() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get('/', (ctx, next) => {
  ctx.body = '主页';
  next();
});

router.get('/hi/:user', (ctx, next) => {
  ctx.body = `hi, ${ctx.params.user}`;
  next();
});

router.get('/config', async (ctx, next) => {
  const cwd = process.cwd();
  const file_name = `${cwd}/tsconfig.json`;
  const res = await read(file_name);
  ctx.body = res;
  next();
});

router.use('/home', indexRouter.routes(), indexRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log('server is running at port ${port}');
});
