const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body;

    if(!email || !name || !password){
     res.status(402).json({error : "Fill all the fileds"})
    }

    UserModel.findOne({email : email}, (err)=>{
        if(err){
            return res.status(400).json({error : "Email already exist"})
        }
    })
     
    bcrypt.hash(password, 10, (err, hashedPassword)=>{
        let newUser = new UserModel({
            name,
            email,
            password : hashedPassword
        })

        newUser.save()
            .then(()=>{
                res.status(201).json({message : "Registration has been Successfull"})
            })
            .catch((err)=>{
                console.log(err)
            })
    })
    next();
})

router.post('/signin', (req, res, next)=>{
    
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(300).json({error : "Fill email and password"})
    }
    UserModel.findOne({email : email})
        .then(user =>{
            if(!user){
                return res.status(422).json({ error : "Invaid email or password"})
            } 
            
            bcrypt.compare(password, user.password)
                .then(doMatch=>{
                    // res.status(400).json({message : "Succesfully login"})
                    const token = jwt.sign("2344ldfd", "secret")
                    res.status(200).send({ message : "Login success" , token :  token})
                })
                .catch(()=>{
                    console.log(err) 
                })
        })
})

module.exports = router;