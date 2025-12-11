require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// simple health
app.get("/health", (req, res) => res.json({ status: "ok", time: new Date() }));

// mount routers (create files in routes/)
app.use("/api/calls", require("./routes/calls")(pool));
app.use("/api/units", require("./routes/units")(pool));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
