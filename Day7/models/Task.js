const mongoose=require("mongoose");

/**
 * Task schema defines a to-do item.
 * - title/description: main content fields
 * - author: reference to a User
 * - isDeleted/deletedAt: logical delete support
 */
const Task=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:String,
        minLength: 4,
        maxLength: 200
    },
    markAsCompleted:
    {
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default: Date.now,
        immutable: true 
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
});

module.exports=mongoose.model("Task",Task);