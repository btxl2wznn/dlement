const { query } = require("express");
// const sql = require("../../plugins/sql");
const crypto = require("crypto");
const sql = require("../../plugins/sql");
const { fstat } = require("fs");

function jiami(str) {
  //需要加密的字符串
  let password = str + "tangqi199912";
  //使用加密算法
  let sf = crypto.createHash("md5");
  //对字符串进行加密
  sf.update(password);
  //加密的二进制数据以字符串的形式保存
  let content = sf.digest("hex");
  return content;
}

module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  //   app.get("/", (req, res) => {
  //     res.send({
  //       message: "你好",
  //     });
  //   });
  const router = express.Router({
    mergeParams: true,
  });
  //获取数据

  router.get("/allLost", async (req, res) => {
    sql.queryAllLost(sql.con, "lost", "'否'", (data) => {
      res.send(data);
    });
  });
  router.get("/allFound", async (req, res) => {
    sql.queryAllFound(sql.con, "found", "'否'", (data) => {
      res.send(data);
    });
  });
  router.get("/allPlace", async (req, res) => {
    sql.queryAllPlace(sql.con, (data) => {
      res.send(data);
    });
  });
  router.get("/areaLost/:id", async (req, res) => {
    sql.queryAreaLost(sql.con, "lost", req.params.id, "'否'", (data) => {
      res.send(data);
    });
  });
  router.get("/areaFound/:id", async (req, res) => {
    sql.queryAreaFound(sql.con, "found", req.params.id, "'否'", (data) => {
      res.send(data);
    });
  });
  router.get("/getLostArt/:id", async (req, res) => {
    sql.queryArt(sql.con, "lost", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/getFoundArt/:id", async (req, res) => {
    sql.queryArt(sql.con, "found", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/category", async (req, res) => {
    sql.queryCategory(sql.con, (data) => {
      res.send(data);
    });
  });
  router.get("/address", async (req, res) => {
    sql.queryAddress(sql.con, (data) => {
      res.send(data);
    });
  });
  router.get("/finishLost/:id", async (req, res) => {
    sql.querylostByid(sql.con, "是", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/ingLost/:id", async (req, res) => {
    sql.querylostByid(sql.con, "否", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/finishfound/:id", async (req, res) => {
    sql.queryfoundByid(sql.con, "是", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/ingfound/:id", async (req, res) => {
    sql.queryfoundByid(sql.con, "否", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/userInfo/:id", async (req, res) => {
    sql.queryById(sql.con, "user", req.params.id, (data) => {
      res.send(data);
    });
  });

  //post
  router.post("/searchLost/:search", async (req, res) => {
    sql.searchArt(sql.con, "lost", req.params.search, (data) => {
      res.send(data);
    });
  });
  router.post("/searchFound/:search", async (req, res) => {
    sql.searchArt(sql.con, "found", req.params.search, (data) => {
      res.send(data);
    });
  });

  router.post("/saveLost", async (req, res) => {
    const tabName =
      "lost(gname, dname, description,img, lostPlace, lspecific, contact, lostTime, luserId)";
    const data = req.body;
    const arr = [
      data.gname,
      data.dname,
      data.description,
      data.img,
      data.lostPlace,
      data.lspecific,
      data.contact,
      data.lostTime,
      data.luserId,
    ];
    const str = "'" + arr.join("','") + "'";
    sql.save(sql.con, tabName, str, (data) => {
      res.send(data);
    });
  });

  router.post("/savefound", async (req, res) => {
    const tabName =
      "found(gname, dname, description,img, foundPlace, fspecific, contact, foundTime, fuserId)";
    const data = req.body;
    const arr = [
      data.gname,
      data.dname,
      data.description,
      data.img,
      data.foundPlace,
      data.fspecific,
      data.contact,
      data.foundTime,
      data.fuserId,
    ];
    const str = "'" + arr.join("','") + "'";
    sql.save(sql.con, tabName, str, (data) => {
      res.send(data);
    });
  });

  app.use("/web/api/rest", router);

  //文件上传
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post("/web/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    //file.url = `http://localhost:5555/uploads/${file.filename}`;
    //file.url = `http://192.168.1.5:5555/uploads/${file.filename}`;
    file.url = `http://47.97.249.152:5555/uploads/${file.filename}`;
    res.send(file);
  });

  //注册
  router.post("/regist", async (req, res) => {
    const tabName =
      "user(userNum, userName, avatar, userTel, userQQ, password)";
    const data = req.body;
    data.password = jiami(data.password);
    const arr = [
      data.userNum,
      data.userName,
      data.avatar,
      data.userTel,
      data.userQQ,
      data.password,
    ];
    const str = "'" + arr.join("','") + "'";
    sql.save(sql.con, tabName, str, (data) => {
      res.send(data);
    });
  });
  router.post("/checkNum", async (req, res) => {
    const data = req.body;
    const num = data.userNum;
    sql.checkNum(sql.con, num, (data) => {
      res.send(data);
    });
  });
  router.put("/updateAvatar", async (req, res) => {
    const data = req.body;
    const avatar = data.avatar;
    const id = data.id;
    sql.updateAvatar(sql.con, avatar, id, (data) => {
      res.send(data);
    });
  });
  router.put("/updateName", async (req, res) => {
    const data = req.body;
    const name = data.userName;
    const id = data.id;
    sql.updateName(sql.con, name, id, (data) => {
      res.send(data);
    });
  });
  router.put("/updateTel", async (req, res) => {
    const data = req.body;
    const tel = data.userTel;
    const id = data.id;
    sql.updateTel(sql.con, tel, id, (data) => {
      res.send(data);
    });
  });
  router.put("/updateQQ", async (req, res) => {
    const data = req.body;
    const QQ = data.userQQ;
    const id = data.id;
    sql.updateQQ(sql.con, QQ, id, (data) => {
      res.send(data);
    });
  });
  router.put("/updatePassword", async (req, res) => {
    const data = req.body;
    const password = jiami(data.password);
    const id = data.id;
    sql.updatePassword(sql.con, password, id, (data) => {
      res.send(data);
    });
  });
  router.put("/isFind/:id", async (req, res) => {
    const id = req.params.id;
    sql.isFind(sql.con, id, (data) => {
      res.send(data);
    });
  });
  router.put("/isGive/:id", async (req, res) => {
    const id = req.params.id;
    sql.isGive(sql.con, id, (data) => {
      res.send(data);
    });
  });
  router.put("/returnisFind/:id", async (req, res) => {
    const id = req.params.id;
    sql.returnisFind(sql.con, id, (data) => {
      res.send(data);
    });
  });
  router.put("/returnisGive/:id", async (req, res) => {
    const id = req.params.id;
    sql.returnisGive(sql.con, id, (data) => {
      res.send(data);
    });
  });
  //删除
  router.delete("/deletelArt/:id", async (req, res) => {
    const id = req.params.id;
    sql.deleteArt(sql.con, "lost", id, (data) => {
      res.send(data);
    });
  });

  router.delete("/deletefArt/:id", async (req, res) => {
    const id = req.params.id;
    sql.deleteArt(sql.con, "found", id, (data) => {
      res.send(data);
    });
  });

  router.get("/webGetFound/:id", async (req, res) => {
    sql.queryById(sql.con, "found", req.params.id, (data) => {
      res.send(data);
    });
  });

  router.get("/webGetLost/:id", async (req, res) => {
    sql.queryById(sql.con, "lost", req.params.id, (data) => {
      res.send(data);
    });
  });

  router.put("/updateFound/:id", async (req, res) => {
    const tabName = "found";
    const data = req.body;
    const arr = [
      data.gname,
      data.dname,
      data.description,
      data.img,
      data.foundPlace,
      data.fspecific,
      data.contact,
      data.foundTime,
    ];
    const upStr =
      " gname = ?, dname =? , description = ?, img = ?, foundPlace =? , fspecific = ?, contact =?, foundTime =?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });
  router.put("/updateLost/:id", async (req, res) => {
    const tabName = "lost";
    const data = req.body;
    const arr = [
      data.gname,
      data.dname,
      data.description,
      data.img,
      data.lostPlace,
      data.lspecific,
      data.contact,
      data.lostTime,
    ];
    const upStr =
      " gname = ?, dname =? , description = ?, img = ?, lostPlace =? ,lspecific =?, contact =?, lostTime =?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });

  router.get("/getUserInfo/:id", async (req, res) => {
    sql.queryById(sql.con, "user", req.params.id, (data) => {
      res.send(data);
    });
  });

  //登录
  router.post("/login", async (req, res) => {
    let { userNum, password } = req.body;
    //1.根据用户名找用户
    sql.checkUser(sql.con, "user", userNum, jiami(password), (data) => {
      res.send(data);
      // assert(data.length != 0, 422, "用户不存在或密码错误");
      // //2.校验密码
      // data[0].password != password &&
      //   assert(data[0].password != password, 422, "用户不存在或密码错误");
      // if (data[0].password == password) {
      //   //3.返回token
      //   const token = jwt.sign({ id: data[0].id }, app.get("secret"));
      //   res.send(token);
      // }
    });

    //1.根据用户名找用户
    // let user = await sql.selectUser( //promise
    //   sql.con,
    //   "admin",
    //   username,
    //   password,
    //   (data) => {
    //     res.send(data);
    //     // assert(data.length != 0, 422, "用户不存在或密码错误");
    //     // //2.校验密码
    //     // data[0].password != password &&
    //     //   assert(data[0].password != password, 422, "用户不存在或密码错误");
    //     // if (data[0].password == password) {
    //     //   //3.返回token
    //     //   const token = jwt.sign({ id: data[0].id }, app.get("secret"));
    //     //   res.send(token);
    //     //}
    //   }
    // );
  });

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
