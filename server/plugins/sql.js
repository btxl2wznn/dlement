const mysql = require("mysql");
const jwt = require("jsonwebtoken");
module.exports = {
  con: mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    database: "dlement",
  }),
  sqlConnect: (con) => {
    con.connect((err) => {
      //连接失败
    });
  },
  selectUser: (con, tabName, name, password, callback) => {
    // return new Promise((resolve, reject) => { //promise写法
    //   let strSql = "SELECT * FROM " + tabName + " WHERE name = '" + name + "'";
    //   con.query(strSql, (err, res) => {
    //     if (res.length == 0) {
    //       callback({ message: "用户不存在或密码错误" });
    //     } else {
    //       //const data = JSON.stringify(res);
    //       if (res[0].password != password) {
    //         callback({ message: "用户不存在或密码错误" });
    //       } else {
    //         //返回token
    //         const token = jwt.sign({ id: res[0].id }, "gaskfo2mdsof");
    //         resolve(token);
    //         callback(token);
    //       }
    //       // return data;
    //     }
    //   });
    // });
    let strSql = "SELECT * FROM " + tabName + " WHERE name = '" + name + "'";
    con.query(strSql, (err, res) => {
      if (res.length == 0) {
        callback({ message: "用户不存在或密码错误" });
      } else {
        //const data = JSON.stringify(res);
        if (res[0].password != password) {
          callback({ message: "用户不存在或密码错误" });
        } else {
          //返回token
          const token = jwt.sign({ id: res[0].id }, "gaskfo2mdsof");
          callback(token);
        }
        // return data;
      }
    });
  },

  //查询数据
  queryAll: (con, tabName, callback) => {
    let strSql = "SELECT * FROM " + tabName + " ORDER BY id";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryPlaces: (con, callback) => {
    let strSql = "SELECT * FROM `place` ORDER BY id";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log("失败");
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryById: (con, tabName, data, callback) => {
    let strSql = "SELECT * FROM  " + tabName + " WHERE id = (?)";
    const arr = data;
    con.query(strSql, arr, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  //插入数据
  save: (con, tabName, str, callback) => {
    let strSql = "INSERT INTO " + tabName + " VALUES(" + str + ")";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "保存成功" });
        // return data;
      }
    });
  },
  updated: (con, tabName, upStr, id, arr, callback) => {
    let strSql = "UPDATE " + tabName + " SET " + upStr + " WHERE id = " + id;
    con.query(strSql, arr, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },
  //删除数据
  delete: (con, tabName, data, callback) => {
    let strSql = "DELETE  FROM " + tabName + " WHERE id = (?)";
    const arr = data;
    con.query(strSql, arr, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "删除成功" });
        // return data;
      }
    });
  },

  //WEB部分
  queryAllLost: (con, tabName, whether, callback) => {
    let strSql =
      "SELECT * from " +
      tabName +
      " WHERE isFind = " +
      whether +
      " ORDER BY id desc";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryAllFound: (con, tabName, whether, callback) => {
    let strSql =
      "SELECT * from " +
      tabName +
      " WHERE isGive = " +
      whether +
      " ORDER BY id desc";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryAllPlace: (con, callback) => {
    let strSql = `SELECT id, pname,CASE 
    WHen pname IN (SELECT lostPlace from lost WHERE isFind = "否") THEN "T"
    WHEN pname in (SELECT foundplace from found where isGive="否") THEN "T"
    ELSE "F"
  END AS 'contain'
   FROM place`;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryAreaLost: (con, tabName, id, whether, callback) => {
    let strSql =
      "SELECT * from " +
      tabName +
      " WHERE isFind = " +
      whether +
      " and lostPlace = (SELECT pname from place WHERE id = " +
      id +
      ")" +
      " ORDER BY id desc";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryAreaFound: (con, tabName, id, whether, callback) => {
    let strSql =
      "SELECT * from " +
      tabName +
      " WHERE isGive = " +
      whether +
      " and foundPlace = (SELECT pname from place WHERE id = " +
      id +
      ")" +
      "ORDER BY id desc";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryArt: (con, tabName, id, callback) => {
    let strSql = "SELECT * from " + tabName + " WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },

  searchArt: (con, tabName, search, callback) => {
    let strSql =
      "SELECT * from " +
      tabName +
      " WHERE " +
      tabName +
      "Place like '%" +
      search +
      "%' OR gname like '%" +
      search +
      "%' or dname like '%" +
      search +
      "%'";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },

  queryCategory: (con, callback) => {
    let strSql = "SELECT category FROM `pcategory` ORDER BY id";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log("失败");
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryAddress: (con, callback) => {
    let strSql = "SELECT pname,category FROM `place` ORDER BY id";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log("失败");
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  checkNum: (con, num, callback) => {
    let strSql = "SELECT * FROM `user` where userNum = " + num;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log("失败");
      } else {
        //const data = JSON.stringify(res);
        console.log(res);
        if (res.length == []) {
          callback({ isHave: false });
        } else {
          callback({ isHave: true });
        }
        // return data;
      }
    });
  },
  checkUser: (con, tabName, num, password, callback) => {
    let strSql = "SELECT * FROM " + tabName + " WHERE userNum = '" + num + "'";
    con.query(strSql, (err, res) => {
      if (res.length == 0) {
        callback({ message: "用户不存在或密码错误" });
      } else {
        //const data = JSON.stringify(res);
        if (res[0].password != password) {
          callback({ message: "用户不存在或密码错误" });
        } else {
          //返回token
          const token = jwt.sign({ id: res[0].id }, "gaskfo2mdsof");
          callback({ userInfo: res[0], token: token });
        }
        // return data;
      }
    });
  },
  querylostByid: (con, isfind, id, callback) => {
    let strSql =
      "SELECT * from lost WHERE luserId = " +
      id +
      " and isFind = '" +
      isfind +
      "'  ORDER BY id desc";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  queryfoundByid: (con, isGive, id, callback) => {
    let strSql =
      "SELECT * from found WHERE fuserId = " +
      id +
      " and isGive = '" +
      isGive +
      "' ORDER BY id desc";
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback(res);
        // return data;
      }
    });
  },
  updateAvatar: (con, avatar, id, callback) => {
    let strSql = "UPDATE user SET avatar = '" + avatar + "' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },
  updateAvatar: (con, avatar, id, callback) => {
    let strSql = "UPDATE user SET avatar = '" + avatar + "' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },
  updateName: (con, name, id, callback) => {
    let strSql = "UPDATE user SET userName = '" + name + "' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },
  updateTel: (con, tel, id, callback) => {
    let strSql = "UPDATE user SET userTel = '" + tel + "' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },
  updateQQ: (con, QQ, id, callback) => {
    let strSql = "UPDATE user SET userQQ = '" + QQ + "' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },
  updatePassword: (con, password, id, callback) => {
    let strSql =
      "UPDATE user SET password = '" + password + "' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },

  isFind: (con, id, callback) => {
    let strSql = "UPDATE lost SET isFind = '是' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },

  isGive: (con, id, callback) => {
    let strSql = "UPDATE found SET isGive = '是' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },
  returnisFind: (con, id, callback) => {
    let strSql = "UPDATE lost SET isFind = '否' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },

  returnisGive: (con, id, callback) => {
    let strSql = "UPDATE found SET isGive = '否' WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "修改成功" });
        // return data;
      }
    });
  },

  deleteArt: (con, tabName, id, callback) => {
    let strSql = "DELETE from " + tabName + " WHERE id = " + id;
    con.query(strSql, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //const data = JSON.stringify(res);
        callback({ success: "删除成功" });
        // return data;
      }
    });
  },
};
