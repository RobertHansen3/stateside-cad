require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const callsRouter = require("./routes/calls");
const unitsRouter = require("./routes/units");

const app = express();
app.use(
  cors({
    origin: "https://stateside-cad-1.onrender.com",
  })
);
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// attach pool to request
app.use((req, res, next) => {
  req.db = pool;
  next();
});

app.use("/api/calls", callsRouter(pool));
app.use("/api/units", unitsRouter(pool));

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", time: new Date() })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
