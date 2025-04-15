import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protect=async(req,res,next)=>{
    try{
        let accessToken=req?.cookies?.accessToken;
        if(!accessToken){
            return res.status(401).json({message:"unauthorized"});
        }
        let decode=await jwt.verify(accessToken,process.env.A_SECRETE_KEY);
        if(!decode){
            return res.status(401).json({message:"unauthorized"});
        }
        let user=await User.findById(decode.id).select("-password");
        req.user=user;
        next();

    }catch(err){
        console.log(err?.message);
        return response.status(500).json({message:e?.message});
    }
}
export const isAdmin=async(req,res,next)=>{
    try{
        let user=req.user;
        if(user.role==="admin"){
            return next()
        }
        return res.status(403).json({message:"Forbidden"});
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:e.message});
    }
}