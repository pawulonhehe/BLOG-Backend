const jwt = require("jsonwebtoken")


function verifyUser(req, res){
    const header = req.header['Authorization']
    const token = header && header.split(' ')[1]

    if(token == null) return res.sendStatus(401)
   
    jwt.verify(token, process.env.TOKEN, (err, user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = verifyUser;