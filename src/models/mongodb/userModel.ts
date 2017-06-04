/*
 * user model/schema
 * @Author: fengyun2
 * @Date: 2016-12-23 15:21:20
 * @Last Modified by: fengyun2
 * @Last Modified time: 2016-12-23 15:25:44
 */

// import { db, Schema } from './mongodb';
import mongodb from './mongodb';
const { db, Schema } = mongodb;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  headImg: {
    type: String,
    required: false
  },
  state: {
    type: String,
    default: 'active'
  },
  location: {
    type: String,
    required: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Number,
    default: Date.now
  }
});

/**
 * 创建索引
 */

UserSchema.index({ createdAt: -1 });
UserSchema.index({ updatedAt: -1 });
UserSchema.index({ email: -1 });

/**
 * 静态方法
 */
UserSchema.statics.findbyid = async function(id: number) {
  const data = await this.findById(id);

  if (data) {
    return { done: true, data };
  }
};

UserSchema.statics.create = async function(obj: object) {
  const user = new this(obj);
  const exists = await this.findOne({ email: user.email });
  if (exists) {
    return {
      done: false
    };
  }

  const back = await user.save();

  if (back) {
    return {
      done: true,
      data: back
    };
  }
  return {
    done: false
  };
};

/**
 * 第三个参数使创建mongo表为user单数, 如果不设置则为默认为复数
 */
const userModel = db.model('User', UserSchema, 'user');
export default userModel;
