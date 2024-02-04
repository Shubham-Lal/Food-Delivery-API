const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const routes = require('./routes');

dotenv.config();

const server = express();
server.use(express.json());

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`[server]: Server running at PORT => ${port}`);
});

server.use(express.static(path.join(__dirname, './public')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(routes);