const express = require("express");
const router = express.Router();
const connection = require("../db.js");

router.get("/", (req, res) => {
  connection.query("SELECT name FROM users", (err, results) => {
    if (err) return res.status(404).json({ status: "error", content: err });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT name FROM `users` WHERE id = ?",
    [req.params.id],
    function (err, results) {
      res.json(results);
    }
  );
});

module.exports = router;
