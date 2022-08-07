const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const ProtectRoute = require("../middlewares/protectedRoute");



router.post('/signin', (req, res, next)=>{    
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(300).json({error : "Fill email and password"})
    }
    UserModel.findOne({email : email})
        .then(user =>{
            if(!user){
                return res.status(422).json({ error : "You are not registered"})
            } 
            
            bcrypt.compare(password, user.password)
                .then(doMatch=>{
                    // res.status(400).json({message : "Succesfully login"})
                    const token = jwt.sign({_id : user._id}, "secret")
                    res.status(200).send({ 
                        message : "Login success" , 
                        token :  token,
                        user : user
                    })
                })
                .catch((err)=>{ 
                    console.log(err) 
                })
        })
})

// register router
router.post("/register", (req, res, next)=>{
    const {name, email, password}  = req.body;

    if(name && email && password){
        UserModel.findOne({email : email})
            .then(result =>{
                if(result){
                    return res.status(400).json({error : " Email already exist"})
                    next();
                }else{
                    bcrypt.hash(password, 10, (err, hashResult)=>{
                        if(!err){
                            let newUser = new UserModel({
                                name,
                                email,
                                password : hashResult
                            })
                            newUser.save()
                                .then(()=>{
                                    return res.status(200).json({message : "Registration has been completed"})
                                    next();
                                })
                        }
                    })
                }
            })
    }else{
        return res.status(300).json({error : "fill all the field"})
        next();
    }
})


module.exports = router;