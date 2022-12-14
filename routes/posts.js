const express = require('express')
const router = express.Router()
const connection = require("../db.js")
const bodyparser = require("body-parser");

router.use(express.json());
router.use(bodyparser.urlencoded({ extended: false }));


const {verifyUser, checkModPermissions} = require("../middleware/verifyToken.js")


router.get("/", (req, res) =>{
    res.json({status:"ok"})
})

router.get('/:id', (req, res) => {
    connection.query(
        'SELECT * FROM `posts` WHERE id = ?',
        [req.params.id],
        function(err, results) {
            res.json(results)
        }
    )
})

router.post('/addPost', verifyUser , (req, res) => {


    //Post może mieć brak kategorii ale nie musi
    let newPost = {
        author_fk: req.user.id,
        category_fk: req.body.category,
        title: req.body.title,
        content: req.body.content
    }


    connection.query(
        'INSERT INTO posts (author_fk, category_fk, title, content) VALUES (?,?,?,?)',
        [newPost],
        function(err, results){
            console.log(results)
            if(err) return res.json({status:"error", content: err.sqlMessage})
            res.json({status: "ok", content: `Post with id(${results.insertId}) has been added`})
        }
    )
})

router.delete('/deletePost', verifyUser, checkModPermissions, (req, res) => {
    connection.query(
        'DELETE FROM posts WHERE id = ?',
        [req.body.id],
        function(err, results){
            if(results.affectedRows == 0) return res.json({status:"error", content: `Post with provided id(${req.body.id}) has not been found`})
            if(err) return res.json({status:"error", content: err.sqlMessage})
            res.json({status:"ok", content: `Post with id(${req.body.id}) got deleted`})
        }
    )
})

router.patch('/editPost', verifyUser, checkModPermissions, (req, res) => {

    //Dopuszczaj modyfikacje tylko tych wartości
    let info = {
        title: req.body.title,
        content: req.body.content
    }
    //lub cokolwiek w query req.body

    connection.query(
        'UPDATE `posts` SET ? WHERE id = ?',
        [req.body, req.body.id],
        function(err, results){
            if(err) return res.json({status:"error", content: err.sqlMessage})
            if(results.affectedRows == 0) return res.json({status:"error", content: `Post with provided id(${req.body.id}) has not been found`})
            res.json({status: "ok", content: `Post with id(${req.body.id}) got edited`})
        }
    )
})

  
module.exports = router