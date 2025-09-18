const mongoose = require('mongoose');
const commnetSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    createdBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
       },
}, {timeStamps:true})

const Comment = mongoose.model("Comment" ,commnetSchema)

module.exports = Comment