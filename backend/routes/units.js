module.exports = (pool) => {
  const express = require("express");
  const router = express.Router();

  router.get("/", async (req, res) => {
    const { rows } = await pool.query(
      "SELECT * FROM stateside_units ORDER BY id"
    );
    res.json(rows);
  });

  router.post("/:id/status", async (req, res) => {
    const { status, coords, job } = req.body;
    const q = `INSERT INTO stateside_units (id, job, status, coords, last_ping)
               VALUES ($1,$2,$3,$4,NOW())
               ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, coords = EXCLUDED.coords, last_ping = NOW()
               RETURNING *`;
    const vals = [
      req.params.id,
      job || "police",
      status || "available",
      JSON.stringify(coords || {}),
    ];
    const { rows } = await pool.query(q, vals);
    res.json(rows[0]);
  });

  return router;
};
