const dotenv = require("dotenv");
const express = require("express");
const { calculatePrice } = require("./controllers/price.js");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

dotenv.config();

const server = express();
server.use(express.json());

server.use(express.static(path.join(__dirname, './public')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.get('/', (req, res) => {
    res.render('index');
});

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Food Delivery API',
            version: '1.0.0',
        },
    },
    apis: ["./controllers/price.js"],
};
const specs = swaggerJsdoc(options);
server.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { customfavIcon: "/favicon.ico", customSiteTitle: "Food Delivery API", customCssUrl: "/swagger-dark.css" }));

server.post("/api/calculate-price", calculatePrice);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`[server]: Server running at PORT => ${port}`);
});