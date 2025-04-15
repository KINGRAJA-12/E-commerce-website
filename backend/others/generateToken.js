import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export const generateToken=async(id)=>{
    try{
        let refreshToken=await jwt.sign({id},process.env.R_SECRETE_KEY,{expiresIn:"7d"})
        let accessToken=await jwt.sign({id},process.env.A_SECRETE_KEY,{expiresIn:"15m"})
        return {refreshToken,accessToken}
    }catch(err){
        console.log(err?.message)
    }
}