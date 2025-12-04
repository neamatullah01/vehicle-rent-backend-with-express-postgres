import express, { Request, Response } from "express";
import initDB from "./config/db";

const app = express();
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle server is running...");
});

export default app;
