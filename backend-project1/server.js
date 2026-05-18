require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();

connectDB();

// parse JSON bodies but allow non-strict values (e.g. quoted JSON strings)
app.use(express.json({ strict: false }));

// If a client sent a JSON payload that was stringified twice (e.g. "{...}"),
// try to coerce it into an object so downstream handlers receive a proper body.
app.use((req, res, next) => {
  try {
    if (typeof req.body === 'string') {
      // First attempt: parse the string once
      let parsed = undefined;
      try {
        parsed = JSON.parse(req.body);
      } catch (e) {
        parsed = undefined;
      }

      // If parsing produced another JSON string, parse again to get the object.
      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed);
        } catch (e) {
          // leave parsed as string if it still isn't valid JSON
        }
      }

      if (parsed !== undefined) req.body = parsed;
    }
  } catch (err) {
    // ignore and continue — we'll let route-level validation handle malformed bodies
  }
  next();
});

app.use('/api/users', userRoutes);            // mount routes

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});