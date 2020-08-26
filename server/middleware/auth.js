module.exports = (options) => {
  const jwt = require("jsonwebtoken");
  const adminUser = require("../models/AdminUser");
  const assert = require("http-assert");
  return async (req, res, next) => {
    //进行后端登录验证中间件
    const token = String(req.headers.authorization || " ")
      .split(" ")
      .pop();
    assert(token, 401, "请先登录（提供token）");
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "请先登录（无效token）");
    req.user = await adminUser.findById(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
};
