const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');


// included routes
const AuthRoutes = require('./routes/auth');
const Posts = require('./routes/post');

// db connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb', (err)=>{
    if(!err){
        console.log("DB connected")
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(AuthRoutes);
app.use(Posts);
// default route
app.get("*", (req, res)=>{res.send("invalid route")})

process.on('unhandledRejection', error => {
    // Prints "unhandledRejection woops!"
    console.log('unhandledRejection', error);
  });
  
// ddd
app.listen(4000, ()=>{
    console.log("server is running...")
})

