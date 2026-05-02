import express from "express";
import routerList from "./src/routers/index.js";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(routerList);


app.listen(PORT, () => {
  console.log(`The server run at PORT ${PORT}`);
});