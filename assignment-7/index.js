import express from "express";
import cors from "cors";

import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import searchRouter from "./routes/searchRouter.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Express.js API!");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/search", searchRouter);

app.use((req, res) => {
  res.status(404).json({ 
    message: `Cannot ${req.method} ${req.url} - Route not found` 
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ 
    message: "Something went wrong on the server!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});