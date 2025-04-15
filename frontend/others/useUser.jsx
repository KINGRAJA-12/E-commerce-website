import { create } from "zustand";
import { axiosInstance } from "./axiosInstances.js";
import toast from "react-hot-toast";
let useUser=create((set)=>({
    isFetching:false,
    products:null,
    isLoading:false,
    singleProduct:null,
    isOther:false,
    otherProduct:null,
    isAdding:false,
    isCart:false,
    getAllproduct:async()=>{
        try{
            set({isFetching:true})
            let res=await axiosInstance.get("/user/get-all");
            set({products:res?.data?.products});
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch product");
        }finally{
            set({isFetching:false})
        }
    },
    getSingleProduct:async(id)=>{
        try{
            set({isLoading:true})
            if(!id) return toast.error("require field is missing");
            let res=await axiosInstance.get(`/user/view-product/${id}`);
            set({singleProduct:res?.data});
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch product");
        }finally{
            set({isLoading:false})
        }
    },
    getAllOtherproduct:async(id)=>{
        try{
            if(!id)return toast.error("require field is missing");
            set({isOther:true})
            let res=await axiosInstance.get(`/user/fetch-other/${id}`);
            set({otherProduct:res?.data?.products});
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch product");
        }finally{
            set({isOther:false})
        }
    },
    addTocart:async(id)=>{
        try{
            if(!id)return toast.error("require data is missing");
            set({isAdding:true});
            let res=await axiosInstance.get(`/user/add-to-cart/${id}`);
            toast.success(res?.data?.message||"item added successfully");

        }catch(err){
            throw new Error(err?.response?.data?.message);
        }finally{
            set({isAdding:false});
        }
    },
    getCartItems:async()=>{
        try{
            set({isCart:true});
            let res=axiosInstance.get
        }catch(err){
            throw new Error(err?.response?.data?.message);
        }finally{
            set({isCart:false})
        }
    }
}))
export default useUser;