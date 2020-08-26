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
      if (err) {
        console.log(err);
        console.log("连接失败");
      } else {
        console.log("连接成功");
      }
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
};
