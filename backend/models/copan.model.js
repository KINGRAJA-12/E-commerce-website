import mongoose from "mongoose"
let copanSchema=new mongoose.Schema({
    copanName:{
        type:String,
        required:true,
        unique:true
    },
    discountpercentage:{
        type:Number,
        min:0,
        max:50,
        required:true
    },
    expiredate:{
        type:Date,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})
let Copan=mongoose.model("copan",copanSchema);
export default Copan;