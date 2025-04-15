import mongoose from "mongoose";
let productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    describtion:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
        min:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
let Product=mongoose.model('product',productSchema);
export default Product;