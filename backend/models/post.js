const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : true
    },
    photo : {
        photo : String,
        // default : "No photo"
    },
    postedBy : {
        type : mongoose.ObjectId,
        ref : "User"
    }
})
const PostModel = new mongoose.model('post', PostSchema);
module.exports = PostModel;