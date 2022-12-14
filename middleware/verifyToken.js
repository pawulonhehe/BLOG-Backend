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

function checkModPermissions(req, res, next){
    if(req.user == null) return res.json({status: "error", content: "User not logged in"})

    if (req.user.ismod == true){
        next()
    }
    else{
        return res.json({status: "error", content: "Insufficient permissions"})    
    }

}

module.exports = {verifyUser, checkModPermissions};