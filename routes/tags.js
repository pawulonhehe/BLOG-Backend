const express = require("express");
const router = express.Router();
const connection = require("../db.js");
const bodyparser = require("body-parser");

router.use(express.json());
router.use(bodyparser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  connection.query("SELECT * FROM category", (err, results) => {
    if (err) return res.status(404).json({ status: "error", content: err });
    res.json({ status: "ok", content: results });
  });
});

router.post("/addTag", (req, res) => {
  connection.query(
    "INSERT INTO category (name) VALUES (?)",
    [req.body.name],
    (err, results) => {
      if (err) return res.status(404).json({ status: "error", content: err });
      res.json({ status: "ok", content: results });
    }
  );
});

router.delete("/deleteTag/:id", (req, res) => {
  connection.query(
    "DELETE FROM category WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(404).json({ status: "error", content: err });
      res.json({ status: "ok", content: results });
    }
  );
});


module.exports = router;
