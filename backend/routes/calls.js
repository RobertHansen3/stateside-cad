module.exports = (pool) => {
  const express = require("express");
  const router = express.Router();

  router.get("/", async (req, res) => {
    const q =
      "SELECT * FROM stateside_calls WHERE state != $1 ORDER BYY created_at DESC";
    const { rows } = await pool.query(q, ["closed"]);
    res.json(rows);
  });

  router.post("/", async (req, res) => {
    const { caller, phone, coords, notes, required_services, priority } =
      req.body;
    const q = `INSERT INTO stateside_calls (caller, phone, coords, notes, required_services, priority)
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const vals = [
      caller,
      phone || "unknown",
      JSON.stringify(coords),
      notes || "",
      JSON.stringify(required_services || {}),
      priority || 3,
    ];
    const { rows } = await pool.query(q, vals);
    res.json(rows[0]);
  });

  return router;
};
