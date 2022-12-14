const express = require('express')
const router = express.Router()
const connection = require("../db.js")

const verifyUser = require("../middleware/verifyToken.js")


router.use((req, res, next) => {
    next()
})

router.get("/", (req, res) =>{
    res.status(403).json({status:"Forbidden"})
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
    connection.query(
        'INSERT INTO posts (author_fk, time_date, category_fk, title, content) VALUES (?,?,?,?,?)',
        [1, Date.now(), 1, "Testowy post", "XD"],
        function(err, results){
            if(err){
                res.json({status:"error", content: err})
            }
            res.json({status: "ok", content: "Dodano post"})
        }
    )
})

  
module.exports = router