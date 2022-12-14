const express = require('express')
const router = express.Router()
const connection = require("../db.js")

router.get("/", (req, res) =>{
    res.json({status:"ok"})
})

router.get('/:id', (req, res) => {
    connection.query(
        'SELECT name FROM `users` WHERE id = ?',
        [req.params.id],
        function(err, results) {
            res.json(results)
        }
    )
})

module.exports = router