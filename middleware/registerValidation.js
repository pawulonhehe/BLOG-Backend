const Joi = require("joi")
const connection = require("../db.js")

const userSchema = Joi.object({
    email: Joi.string()
        .email()
        .min(3)
        .max(30)
        .required(),

    name: Joi.string()
        .min(5)
        .max(25)
        .required(),

    password: Joi.string()
        .min(5)
        .max(25)
        .required()
})

function validateUser(req, res, next){

    const dummy = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }

    const validation = userSchema.validate(dummy)

    if(validation.error){
        res.json({status: "error", content: validation.error.details[0].message})
    }
    else{
        connection.query(
            'SELECT email FROM users WHERE email = ?',
            [req.body.email], (err, results) => {
                if(results.length == 0){
                    next()
                }else{
                    res.json({status:"error", content: "Email is already in use!"})
                    return
                }
            }
        )
    }    
}



module.exports = validateUser
