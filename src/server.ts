import { Request, Response } from "express";
import app from "./app";
import config from "./config";

const port = config.port;
app.listen(port, () => {
  console.log(`server is running ${port} port`);
});
