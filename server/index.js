const express = require("express");

const app = express();

app.use(require("cors")());
app.use(express.json());

//配件静态路径
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/admin", express.static(__dirname + "/admin"));
app.use("/map", express.static(__dirname + "/web"));

app.set("secret", "gaskfo2mdsof");

require("./routes/admin")(app);
require("./routes/web")(app);
const sql = require("./plugins/sql");
sql.sqlConnect(sql.con);

app.listen("5555", () => {
  console.log("http://localhost:5555");
});
