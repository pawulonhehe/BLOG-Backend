const express = require('express')
const router = express.Router()
const connection = require("../db.js")

router.use((req, res, next) => {
    next()
})

router.get("/", (req, res) =>{
    res.status(403).json({status:"Forbidden"})
})

router.get('/:id', (req, res) => {
    connection.query(
        'SELECT * FROM `users` WHERE id = ?',
        [req.params.id],
        function(err, results) {
            res.json(results)
        }
    )
})


  

  
module.exports = router