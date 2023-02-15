const express = require("express");
const router = express.Router();
const connection = require("../db.js");
const bodyparser = require("body-parser");

router.use(express.json());
router.use(bodyparser.urlencoded({ extended: false }));

const {
  verifyUser,
  checkModPermissions,
} = require("../middleware/verifyToken.js");

router.get("/", (req, res) => {
  connection.query(
    "SELECT posts.id, posts.title, posts.content, posts.likes, posts.time_date,category.name AS category_name, users.name  FROM posts INNER JOIN category ON posts.category_fk = category.id INNER JOIN users ON posts.author_fk = users.id",
    function (err, results) {
      if (err) {
        res.json({ status: "error", content: err.sqlMessage });
      }
      res.json(results);
    }
  );
});

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM `posts` WHERE id = ?",
    [req.params.id],
    function (err, results) {
      res.json(results);
    }
  );
});

router.post("/addPost", verifyUser, (req, res) => {
  //Post może mieć brak kategorii ale nie musi
  connection.query(
    "INSERT INTO posts (author_fk, category_fk, title, content) VALUES (?,?,?,?)",
    [req.user.id, req.body.category, req.body.title, req.body.content],
    function (err, results) {
      console.log(results);
      if (err) return res.json({ status: "error", content: err.sqlMessage });
      res.json({
        status: "ok",
        content: `Post with id(${results.insertId}) has been added`,
      });
    }
  );
});

router.delete("/deletePost", verifyUser, checkModPermissions, (req, res) => {
  connection.query(
    "DELETE FROM posts WHERE id = ?",
    [req.body.id],
    function (err, results) {
      if (results.affectedRows == 0)
        return res.json({
          status: "error",
          content: `Post with provided id(${req.body.id}) has not been found`,
        });
      if (err) return res.json({ status: "error", content: err.sqlMessage });
      res.json({
        status: "ok",
        content: `Post with id(${req.body.id}) got deleted`,
      });
    }
  );
});

router.patch("/editPost", verifyUser, checkModPermissions, (req, res) => {
  //Dopuszczaj modyfikacje tylko tych wartości
  let info = {
    title: req.body.title,
    content: req.body.content,
  };
  //lub cokolwiek w query req.body

  connection.query(
    "UPDATE `posts` SET ? WHERE id = ?",
    [req.body, req.body.id],
    function (err, results) {
      if (err) return res.json({ status: "error", content: err.sqlMessage });
      if (results.affectedRows == 0)
        return res.json({
          status: "error",
          content: `Post with provided id(${req.body.id}) has not been found`,
        });
      res.json({
        status: "ok",
        content: `Post with id(${req.body.id}) got edited`,
      });
    }
  );
});

module.exports = router;
