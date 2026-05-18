import express from "express";
import routerList from "./routers/index.js";
import { logingMiddleware as loginMiddleware } from "./utils/middlewares.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { userList } from "./utils/userList.js";
import Passport from "passport";
import "./auth/local-auth.js";  
import mongoose from "mongoose";
import dbConnection from "./db.js";


const app = express();
const isProduction = process.env.NODE_ENV === "production";

app.use(cookieParser());
app.use(express.json());

const dbConnected = await dbConnection();
if (dbConnected) {
  console.log("✅ MongoDB connection established (index)");
} else {
  console.log("⚠️ MongoDB not available — running without DB");
}

// Normalize the parsed body for JSON string payloads, if any.
app.use((req, _res, next) => {
  if (typeof req.body === "string") {
    try {
      req.body = JSON.parse(req.body);
    } catch {
      // Keep the string body as-is if it is not nested JSON.
    }
  }
  next();
});

app.use(
  session({
    secret: "My Cookie Secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000 * 60 * 24,
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
    },
  })
);

const PORT = process.env.PORT || 9000;

app.post("/api/passport-auth",Passport.authenticate("local", { session: false }), (req, res) => {
  res.send({ message: "Login successful" });
});

app.get("/", (req, res) => {
  res.cookie("QIYAS", "AASTU CAMPASS", { maxAge: 60000, secure: isProduction });
  res.send({ message: "COOKIES" });
});

app.get("/getcookie", (req, res) => {
  const cookie = req.cookies && req.cookies.QIYAS;
  res.send({ cookie });
});

app.get("/session", loginMiddleware, (req, res) => {
  req.session.user = "Abenezer";

  console.log(req.session);
  console.log(req.sessionID);
  console.log(req.session.id);

  req.session.visited = true;

  res.send({ message: "Session is just started" });
});

app.use(routerList);

app.get("/api/auth/login", (_req, res) => {
  return res.status(405).send({ message: "Method Not Allowed. Use POST /api/auth/login with JSON body { username, password }." });
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};

  console.log(`Login attempt for user: ${username}`);

  const userFind = userList.find((user) => user.username === username);

  if (!userFind || userFind.password !== password) {
    console.log(`Login failed for user: ${username}`);
    return res.status(401).send({ message: "Not authorized" });
  }

  req.session.user = username;
  console.log(`Login successful for user: ${username}`);

  return res.status(200).send({ message: "Login successful", session: req.session });
});

app.get("/api/auth/session", loginMiddleware, (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).send({ user: req.session.user, session: req.session });
  }
  return res.status(401).send({ message: "Not authorized" });
});

// Handle invalid JSON payloads from body parser
app.use((err, req, res, next) => {
  if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON received:', err.message);
    return res.status(400).send({ message: 'Invalid JSON payload' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`The server runs at PORT ${PORT}`);
});
