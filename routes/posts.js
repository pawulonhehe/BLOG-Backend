const express = require('express')
const router = express.Router()
const connection = require("../db.js")
const bodyparser = require("body-parser");

router.use(express.json());
router.use(bodyparser.urlencoded({ extended: false }));


const verifyToken = require("../middleware/verifyToken.js")


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

router.post('/addPost', verifyToken , (req, res) => {
    connection.query(
        'INSERT INTO posts (author_fk, category_fk, title, content) VALUES (?,?,?,?)',
        [req.user.id, req.body.category, req.body.title, req.body.content],
        function(err, results){
            if(err){
                res.json({status:"error", content: err.sqlMessage})
                return
            }
            res.json({status: "ok", content: "Dodano post"})
        }
    )
})

router.delete('/deletePost', verifyToken, (req, res) => {
    connection.query(
        'DELETE FROM posts WHERE id = ?',
        [req.body.id],
        function(err, results){
            if(err) {
                res.json({status:"error", content: err})
                return
            }
            res.json({status:"ok", content: "Usunięto post"})
        }
    )
})

  
module.exports = router