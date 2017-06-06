/**
 * mongodb连接
 */
import * as config from "config";
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const mongodbConfig : any = config.get("Customer.mongodbConfig");

const mongoLink = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.database}`;

// const db = mongoose.createConnection(mongoLink, (err : Object) => {   if
// (err) {     throw err;   }   console.error("connect mongodb's database
// success"); });
mongoose.connect(mongoLink, {
  server: {
    auto_reconnect: true
  }
});
const db = mongoose.connection;

db.on("error", (err : Object) => {
  console.error("数据库连接失败: " + err);
  mongoose.disconnect();
});

db.on("open", () => {
  console.log("数据库连接成功!");
});

db.on("close", () => {
  console.log("数据库断开连接");
  mongoose.connect(mongoLink, {
    server: {
      auto_reconnect: true
    }
  });
});

export default {
  db,
  Schema
};
