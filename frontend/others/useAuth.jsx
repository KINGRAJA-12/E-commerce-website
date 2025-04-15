import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "./axiosInstances.js"
  
let useAuth=create((set)=>({
    isLogin:false,
    isRegister:false,
    user:null,
    isLogout:false,
    register:async(data)=>{
        try{
            set({isRegister:true});
            let res=await axiosInstance.post("/auth/register",data);
            if(res.status===200){
                toast.success("register successfully")
            }
        }catch(err){
            throw new Error(err?.response?.data?.message)
        }finally{
            set({isRegister:false})
        }
    },
    login:async(data)=>{
        try{
            set({isLogin:true})
            let res=await axiosInstance.post("/auth/login",data);
            if(res.status===200){
                toast.success("login successfully")
            }
        }catch(err){
            console.log(err?.message)
    throw new Error(err?.response?.data?.message||"failed to login");
        }finally{
            set({isLogin:false})
        }
    },
    logout:async()=>{
        try{
            set({isLogout:true})
            let res=await axiosInstance.get("/auth/logout");
            if(res.status===200){
                toast.success("logout sucessfully");
            }
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to logout")
        }finally{
            set({isLogout:false})
        }
    }
}))
export default useAuth