const jwt = require("jsonwebtoken")


function verifyUser(req, res, next){
    const header = req.headers.authorization
    const token = header && header.split(' ')[1]
    

    if(token == null) return res.json({status: "error", content: "Token empty"})
   
    jwt.verify(token, process.env.TOKEN, (err, user)=>{
        if (err) {
            res.json({status:"error", content: "Invalid token"});
            return
        }
        req.user = user
        next()
    })
}

module.exports = verifyUser;