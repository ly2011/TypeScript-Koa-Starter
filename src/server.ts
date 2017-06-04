"use strict";

import { readFile } from "fs";
import * as Koa from "koa";
import * as Router from "koa-router";

const app = new Koa();
const router = new Router();

const read = (file: string) => {
  return new Promise((resolve, reject) => {
    readFile(file, (err, data) => {
      if (err) return reject(err);
      resolve(data.toString());
    });
  });
};

router.get("/", (ctx, next) => {
  ctx.body = "主页";
});

router.get("/hi/:user", (ctx, next) => {
  ctx.body = `hi, ${ctx.params.user}`;
});

router.get("/config", async (ctx, next) => {
  const cwd = process.cwd();
  const file_name = `${cwd}/tsconfig.json`;
  const res = await read(file_name);
  ctx.body = res;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is running");
});
