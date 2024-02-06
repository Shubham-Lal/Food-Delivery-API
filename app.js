const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const routes = require("./routes");

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);
module.exports = app;