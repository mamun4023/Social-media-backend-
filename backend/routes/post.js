const express = require('express');
const router = express.Router();
const ProtectedRoute = require('../middlewares/protectedRoute');
const PostModel = require('../models/post')


router.post('/create_post', ProtectedRoute, (req, res)=>{
    const {title, body} = req.body;

    if(!title || !body){
        return res.status(422).json({error : "Please add all the fileds"})
    }

    const newPost = new PostModel({
        title,
        body, 
        postedBy : req.user
    })

    newPost.save()
        .then(result =>{
            res.json({post : result})
        })
        .catch(()=>{
            console.log("Faild")
        })
})

router.get("/all_post", ProtectedRoute, (req, res)=>{
    PostModel.find() 
        .populate("postedBy", "_id name")
        .then(posts =>{
            res.json({ posts : posts })
        })
        .catch(err =>{
            console.log(err);
        })
})

router.get('/my_post', ProtectedRoute, (req, res)=>{
    PostModel.find({postedBy : req.user._id})
        .populate("postedBy", "_id name")
        .then(myPost =>{
            return res.status(200).json({my_post : myPost})
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get('/ddd', (req, res)=>{
    res.send("working")
})
 

module.exports = router;