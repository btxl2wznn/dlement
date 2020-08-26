module.exports = (options) => {
  return async (req, res, next) => {
    //加入中间件根据不同的请求路径判定models
    let modelName = require("inflection").classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
