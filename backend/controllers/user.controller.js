import User from "./../models/user.model.js"
import Product from "../models/product.model.js"
export const addToCart=async(req,res,next)=>{
    try{
        let userId=req.user?._id;
        let user=await User.findById(userId);
        let {productId}=req.params;
        if(!productId){
            return res.status(400).json({message:"Require Id missing"});
        }
        let product=await Product.findById(productId);
        if(!product){
            return res.status(400).json({message:"item not found"});
        }
        let filterData= user.cartItems.find((item)=>item?.product.toString()===product?._id.toString())
        if(filterData){
            filterData.quantity+=1
        }
        else{
        user.cartItems.push({product:product._id});
        }
        await user.save();
        return res.status(200).json({message:"item added successfully"});
        
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const increamentCount=async(req,res)=>{
    try{
        let userId=req.user?._id;
        let {productId}=req.params;
        if(!productId){
            return res.status(400).json({message:"Require Id is missing"});
        }
        let user=await User.findById(userId);
        if(!user){
            return res.status(401).json({message:"unauthorized"});
        }
        let existingProduct=user.cartItems.find((item)=>item?.product.toString()===productId);
        if(!existingProduct){
            return res.status(400).json({message:"require item missing"});
        }
        existingProduct.quantity+=1;
        await user.save()
        return res.status(200).json({message:"Added successfully"})
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const decreamentCount=async(req,res,next)=>{
    try{
        let userId=req.user?._id;
        let {productId}=req.params;
        if(!productId){
            return res.status(400).json({message:"require id is missing"});
        }
        let user=await User.findById(userId);
        if(!user){
            return res.status(401).json({message:'unauthorized'});
        }
        let existingProduct=user.cartItems.find((item)=>item?.product.toString()===productId);
        if(existingProduct.quantity===1){
           user.cartItems=user.cartItems.filter((item)=>item?.product.toString()!==productId)
        }
        else{
        existingProduct.quantity-=1;
        }
        await user.save();
        return res.status(200).json({message:"removed successfully"});
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const removeFromCart=async(req,res,next)=>{
    try{
        let userId=req.user?._id;
        let {productId}=req.params;
        if(!productId){
            return res.status(400).json({message:"Require id is missing"});
        }
        let user=await User.findById(userId);
        if(!user){
            return res.status(401).json({message:"unauthorized"});
        }
        if(!user.cartItems){
            return res.status(400).json({message:"No cart items found"});
        }
        user.cartItems=user.cartItems.filter((item)=>item?.product.toString()!==productId);
        await user.save();
        return res.status(200).json({message:"romeved successfully"});
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const viewProduct=async(req,res,next)=>{
    try{
        let {id}=req?.params;
        if(!id){
            return res.status(400).json({message:"require id not find"});
        }
        let product=await Product.findById(id);
        return res.status(200).json(product);
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const fetchOthers=async(req,res,next)=>{
    try{
       let {id}=req.params;
       if(!id){
        return res.status(400).json({message:"require id missing"});
       } 
       let products=await Product.find({_id:{$ne:id}});
       return res.status(200).json({products})
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const getCartItems=async(req,res,next)=>{
    try{
        let userId=req?.user?._id;
        if(!userId){
            return res.status(401).json({message:"unauhtorized"});
        }
        let user=await User.findById(userId).select("cartItems").populate("cartItems.product");
        let cartItems = user.cartItems.filter(item => item.product !== null);
        //console.log(cartItems)
        return res.status(200).json(cartItems);
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const getFeaturedProduct=async(req,res,next)=>{
    try{
        let products=await Product.find({isFeatured:true});
        return res.status(200).json(products);
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}