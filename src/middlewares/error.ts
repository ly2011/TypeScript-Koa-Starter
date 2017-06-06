import {Middleware, Context} from 'koa';

export default(opts
  ?) : Middleware => {
  return async(ctx, next) => {
    try {
      await next();
    } catch (err) {
      switch (err.status) {
        case 401:
          ctx.body = '请先登录！';
          break;

        default:
          ctx.body = err.stack || err.message;
          break;
      }
    }
  };
};
