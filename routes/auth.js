const express = require("express");
const router = express.Router();
const connection = require("../db.js");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
require("dotenv").config();

const validateUser = require("../middleware/registerValidation.js");

router.use(express.json());
router.use(bodyparser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.status(403).json({ status: "Forbidden" });
});

router.post("/login", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE `email` = ? AND `password` = ?",
    [req.body.email, req.body.password],
    (err, results) => {
      if (results.length > 0) {
        let user = {
          id: results[0].id,
          name: results[0].name,
          email: results[0].email,
          password: results[0].password,
          mod: results[0].ismod,
        };

        let token = jwt.sign(user, process.env.TOKEN);
        res.json({ status: "ok", content: token });
      } else {
        res.json({
          status: "error",
          content: "User with provided credentials has not been found",
        });
      }
    }
  );
});

router.post("/register", validateUser, (req, res) => {
  connection.query(
    "INSERT INTO users (email,name,password) VALUES (?,?,?)",
    [req.body.email, req.body.name, req.body.password],
    (err, result) => {
      if (err) {
        res.json({ status: "error", content: err });
      }
    }
  );
  res.json({ status: "ok", content: "Zarejestrowano" });
});

module.exports = router;
