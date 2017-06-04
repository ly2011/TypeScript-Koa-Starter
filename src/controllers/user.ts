import { isPlainObject } from 'lodash';
import userModel from '../models/mongodb';
const { User } = userModel;

const create = async (ctx: any) => {
  let reqData = {};
  const bodyData = ctx.request.body;

  if (!!bodyData && !isPlainObject(bodyData)) {
    reqData = bodyData;
  } else {
    reqData = {
      name: 'ly',
      email: '1518550424@qq.com',
      password: '123456'
    };
  }
  try {
    console.log('reqData: ', reqData);
    const userRes: any = await User.create(reqData);
    const { done, data } = userRes;
    if (done) {
      ctx.body = data;
    } else {
      ctx.body = {
        message: '该用户已经存在'
      };
    }
  } catch (err) {
    ctx.status = err.status || 500;
    if (!!err && !!err.message) {
      ctx.body = {
        message: err.message
      };
    }
  }
};

const findOne = async (ctx: any) => {
  try {
    const userRes: any = await User.findById(ctx.query.id);
    if (userRes) {
      ctx.body = userRes;
    } else {
      ctx.body = {
        message: '该用户不存在'
      };
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: 'Server Error'
    };
    if (!!err && !!err.message) {
      ctx.body = {
        message: err.message
      };
    }
  }
};

const login = async (ctx: any) => {
  try {
    const { name, password, email } = ctx.request.body;
    const user: any = await User.finuserRes({ name, password }, 'name');
    if (!user) {
      ctx.session.current_user = undefined;
      ctx.body = {
        message: '该用户还没注册'
      };
    } else {
      ctx.session.current_user = user.name;
      ctx.session.current_user_id = user._id;
      ctx.body = user;
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: 'Server Error'
    };
    if (!!err && !!err.message) {
      ctx.body = {
        message: err.message
      };
    }
  }
};

const find = async (ctx: any) => {
  try {
    const userRes: any = await User.find();
    if (!!userRes) {
      ctx.body = userRes;
    } else {
      ctx.body = {
        message: '用户列表为空'
      };
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: 'Server Error'
    };
    if (!!err && !!err.message) {
      ctx.body = {
        message: err.message
      };
    }
  }
};

export default {
  create,
  findOne,
  login,
  find
};
