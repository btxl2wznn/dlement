const { query } = require("express");
// const sql = require("../../plugins/sql");
const crypto = require("crypto");
const sql = require("../../plugins/sql");
const { fstat } = require("fs");

function jiami(str) {
  //需要加密的字符串
  let password = str;
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
  router.get("/pcategory", async (req, res) => {
    sql.queryAll(sql.con, "pcategory", (data) => {
      res.send(data);
    });
  });
  router.get("/placeList", async (req, res) => {
    sql.queryAll(sql.con, "place", (data) => {
      res.send(data);
    });
  });
  router.get("/place/:id", async (req, res) => {
    sql.queryById(sql.con, "place", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/lost/:id", async (req, res) => {
    sql.queryById(sql.con, "lost", req.params.id, (data) => {
      res.send(data);
    });
  });

  router.get("/lostList", async (req, res) => {
    sql.queryAll(sql.con, "lost", (data) => {
      res.send(data);
    });
  });

  router.get("/found/:id", async (req, res) => {
    sql.queryById(sql.con, "found", req.params.id, (data) => {
      res.send(data);
    });
  });

  router.get("/foundList", async (req, res) => {
    sql.queryAll(sql.con, "found", (data) => {
      res.send(data);
    });
  });
  router.get("/usersList", async (req, res) => {
    sql.queryAll(sql.con, "user", (data) => {
      res.send(data);
    });
  });
  router.get("/adminList", async (req, res) => {
    sql.queryAll(sql.con, "admin", (data) => {
      res.send(data);
    });
  });
  router.get("/users/:id", async (req, res) => {
    sql.queryById(sql.con, "user", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/admin/:id", async (req, res) => {
    sql.queryById(sql.con, "admin", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.get("/getAdmin/:id", async (req, res) => {
    const { id } = jwt.verify(req.params.id, "gaskfo2mdsof");
    sql.queryById(sql.con, "admin", id, (data) => {
      res.send(data);
    });
  });
  //保存or 更新
  router.post("/savePlace", async (req, res) => {
    const tabName = "place(pname, category)";
    const data = req.body;
    const arr = [data.pname, data.category];
    const str = "'" + arr.join("','") + "'";
    sql.save(sql.con, tabName, str, (data) => {
      res.send(data);
    });
  });
  router.put("/updatePlace/:id", async (req, res) => {
    const tabName = "place ";
    const data = req.body;
    const arr = [data.pname, data.category];
    const upStr = "pname = ?, category = ?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });

  router.post("/savelost", async (req, res) => {
    const tabName =
      "lost(gname, dname, description,img, lostPlace, lspecific, contact, lostTime, luserId, isFind)";
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
      data.isFind,
    ];
    const str = "'" + arr.join("','") + "'";
    sql.save(sql.con, tabName, str, (data) => {
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
      data.luserId,
      data.isFind,
    ];
    const upStr =
      " gname = ?, dname =? , description = ?, img = ?, lostPlace =? ,lspecific =?, contact =?, lostTime =? , luserId = ?, isFind = ?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });

  router.post("/savefound", async (req, res) => {
    const tabName =
      "found(gname, dname, description,img, foundPlace, fspecific, contact, foundTime, fuserId, isGive)";
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
      data.isGive,
    ];
    const str = "'" + arr.join("','") + "'";
    sql.save(sql.con, tabName, str, (data) => {
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
      data.fuserId,
      data.isGive,
    ];
    const upStr =
      " gname = ?, dname =? , description = ?, img = ?, foundPlace =? , fspecific = ?, contact =?, foundTime =? , fuserId = ?, isGive = ?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });
  //用户保存
  router.post("/saveUser", async (req, res) => {
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
  router.put("/updateUser/:id", async (req, res) => {
    const tabName = "user";
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
    console.log(arr);
    const upStr =
      " userNum = ?, userName = ?, avatar = ?, userTel = ?, userQQ = ?, password = ?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });
  router.put("/updatePlace/:id", async (req, res) => {
    const tabName = "place ";
    const data = req.body;
    const arr = [data.pname, data.category];
    const upStr = "pname = ?, category = ?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });
  router.post("/saveAdmin", async (req, res) => {
    const tabName = "admin(name, password)";
    const data = req.body;
    const arr = [data.name, data.password];
    const str = "'" + arr.join("','") + "'";
    sql.save(sql.con, tabName, str, (data) => {
      res.send(data);
    });
  });
  router.put("/updateAdmin/:id", async (req, res) => {
    const tabName = "admin";
    const data = req.body;
    const arr = [data.name, data.password];
    const upStr = "name = ?, password = ?";
    sql.updated(sql.con, tabName, upStr, req.params.id, arr, (data) => {
      res.send(data);
    });
  });
  //删除
  router.delete("/deletePlace/:id", async (req, res) => {
    sql.delete(sql.con, "place", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.delete("/deleteLost/:id", async (req, res) => {
    sql.delete(sql.con, "lost", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.delete("/deleteFound/:id", async (req, res) => {
    sql.delete(sql.con, "found", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.delete("/deleteUser/:id", async (req, res) => {
    sql.delete(sql.con, "user", req.params.id, (data) => {
      res.send(data);
    });
  });
  router.delete("/deleteAdmin/:id", async (req, res) => {
    sql.delete(sql.con, "admin", req.params.id, (data) => {
      res.send(data);
    });
  });
  app.use("/admin/api/rest", router);

  //文件上传
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    //file.url = `http://localhost:5555/uploads/${file.filename}`;
    file.url = `http://192.168.1.5:5555/uploads/${file.filename}`;
    res.send(file);
  });

  //登录
  app.post("/admin/api/login", async (req, res) => {
    let { username, password } = req.body;
    //1.根据用户名找用户
    sql.selectUser(sql.con, "admin", username, password, (data) => {
      res.send(data);
      // assert(data.length != 0, 422, "用户不存在或密码错误");
      // //2.校验密码
      // data[0].password != password &&
      //   assert(data[0].password != password, 422, "用户不存在或密码错误");
      // if (data[0].password == password) {
      //   //3.返回token
      //   const token = jwt.sign({ id: data[0].id }, app.get("secret"));
      //   res.send(token);
      //}
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
