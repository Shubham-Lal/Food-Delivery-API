const express = require("express");
const routes = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { calculatePrice } = require("./controllers/price.js");


// Display homepage at "/" (GET request)
routes.get("/", (req, res) => {
    res.render("index");
});

// Display Swagger at "/docs"
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Food Delivery API",
            version: "1.0.0",
        },
    },
    apis: ["./controllers/price.js"],
};
const specs = swaggerJsdoc(options);
routes.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        customSiteTitle: "Food Delivery API",
        customfavIcon: "/favicon.ico",
        customCssUrl: [
            "/swagger-ui.css",
            "/swagger-dark.css" // for dark theme
        ],
        customJs: [
            "/swagger-ui-bundle.js",
            "/swagger-ui-standalone-preset.js",

        ]
    })
);

// Calculate price at "/api/calculate-price" (POST request)
routes.post("/api/calculate-price", calculatePrice);

module.exports = routes;