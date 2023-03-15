const express = require("express");
const db = require("./database/db.js");
const { router } = require('./routes/projectroutes');
//require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
//app.use("/public", express.static("public"));
app.listen(8080, () => console.log("server1 is runing on port 8080"));
