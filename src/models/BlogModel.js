import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        unique:true
    },

    body:{
        type:String,
        required:true,
        
    },

    author:{
        type:String,
        required:true
    }




}, {
    timestamps:true
})


export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);