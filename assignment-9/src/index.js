import express from "express";
import routerList from "./routers/index.js";
import { logingMiddleware } from "./utils/middlewares.js";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(logingMiddleware);
app.use(routerList)


app.listen(PORT, () => {
  console.log(`The server run at PODT ${PORT}`);
});
