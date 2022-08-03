const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const AuthRoutes = require('./routes/auth');

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

app.listen(3000, ()=>{
    console.log("server is running...")
})