const mongoose=require("mongoose");

/**
 * User schema represents application users.
 * - role: 'admin' or 'user' controls authorization in middleware.
 */
const User=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select: false 
    },
    role:{
        type:String,
        enum: ['admin','user'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default: Date.now,
        immutable: true 
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model("User",User);