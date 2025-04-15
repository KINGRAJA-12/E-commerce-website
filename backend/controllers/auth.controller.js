import User from "../models/user.model.js";
import { generateToken } from "../others/generateToken.js";
import client from "../libs/redis.js";
import jwt from "jsonwebtoken";
import Redis from "ioredis";
export const register=async (req,res,next)=>{
    try{
        let {name,email,password}=req.body;
        if(!name|| !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        let user=await User.find({email:email});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }
        let newUser=await User.create({name,email,password});
        return res.status(201).json({name:newUser?.name});       
    
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:err?.message});
    }
}
export const login=async(req,res,next)=>{
    try{
        let {email,password}=req.body;
        if(! email || ! password){
            return res.status(400).json({message:"All fields are requre"});
        }
        let user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"invalide credential"});
        }
        let isMatch=await user.compare(password)
        if(!isMatch){
            return res.status(400).json({message:"invalide credentials"});
        }
        let {refreshToken,accessToken}=await generateToken(user._id);
        res.cookie("refreshToken",refreshToken,{httpOnly:true,maxAge:7*24*60*60*1000,sameSite:"strict",secure:false});
        res.cookie("accessToken",accessToken,{httpOnly:true,maxAge:15*60*1000,secure:false,sameSite:"strict"});
        await client.set(`refreshToken${user._id}`,refreshToken,"EX",7*24*60*60)
        return res.status(200).json({message:"login sucessfully"});
    }catch(err){
        return res.status(500).json({message:err?.message});
    }
}
export const logout=async(req,res,next)=>{
    try{
        let user=req?.user
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        await client.del(`refreshToken${user._id}`);
        return res.status(200).json({message:"logout successfully"});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:err?.message});
    }
}
export const getme=async(req,res,next)=>{
    try{
        let user=req.user;
        return res.status(200).json({user});
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const refreshToken=async(req,res,next)=>{
    try{
        let refreshToken=req?.cookies?.refreshToken;
        if(!refreshToken)return res.status(403).json({message:"Unauthorized please login"});
        let decode=null;
        try{
        decode=await jwt.verify(refreshToken,process.env.R_SECRETE_KEY);
        }catch(err){
            return res.status(403).json({message:"farbidden"});
        }
        let data=await client.get(`refreshToken${decode.id}`);
        if(data!==refreshToken){
            return res.status(403).json({message:"invalide credential"});
        }
        let accessToken=await jwt.sign({id:decode.id},process.env.A_SECRETE_KEY,{expiresIn:"15m"});
        res.cookie("accessToken",accessToken,{httpOnly:true,maxAge:15*60*1000,secure:false,sameSite:"strict"});
        return res.status(200).json({message:"Token validated sucessfully"});
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}