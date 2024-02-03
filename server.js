import dotenv from "dotenv";
import express from "express";
import { calculatePrice } from "./controllers/price.js";

dotenv.config();

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send("Server running...");
});

server.post("/api/calculate-price", calculatePrice);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`[server]: Server running at PORT => ${port}`);
});