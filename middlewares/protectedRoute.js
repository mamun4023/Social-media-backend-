const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const ProtectRoute = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) return res.send("Access Denied")

    // try{
    //     const varified = jwt.verify(token, "secret");
    //     req.user = varified;
    //     next();
    // }catch(err){
    //     res.send("Invalid Token")
    // }


    jwt.verify(token, "secret", (err, payload)=>{
        if(err){
            return res.status(401).json({error : "you must be logged in"})
        }

        const {_id} = payload;
        UserModel.findById({_id : _id})
            .then(userData =>{ 
                req.user = userData;
                next()
            })
    })
}

module.exports = ProtectRoute