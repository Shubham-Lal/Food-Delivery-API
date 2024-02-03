import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { calculatePrice } from "./controllers/price";

dotenv.config();

const server: Express = express();
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
    res.send("Server running...");
});

server.post("/api/calculate-price", calculatePrice);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`[server]: Server running at PORT => ${port}`);
});