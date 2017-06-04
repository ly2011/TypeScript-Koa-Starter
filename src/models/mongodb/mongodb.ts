/**
 * mongodb连接
 */
import * as config from 'config';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const mongodbConfig: any = config.get('Customer.mongodbConfig');

const mongodbConfig = {
  host: '127.0.0.1',
  port: 27017,
  database: 'koa2'
};

const mongoLink = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.database}`;

const db = mongoose.createConnection(mongoLink, (err: Object) => {
  if (err) throw err;
  console.error(`connect mongodb's database success`);
});

db.on('error', (err: object) => {
  console.error(`数据库连接失败!`);
});

db.on('open', () => {
  console.log(`数据库连接成功!`);
});

export default {
  db,
  Schema
};
