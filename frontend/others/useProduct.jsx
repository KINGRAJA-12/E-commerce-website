import {create} from "zustand";
import { axiosInstance } from "./axiosInstances.js";
import toast from "react-hot-toast"
let useProduct=create((set)=>({
    isCreating:false,
    isUpdating:false,
    isFeaturing:false,
    isDeleting:false,
    isFetching:false,
    products:[],
    singleProduct:null,
    isCart:false,
    cart:null,
    isf:false,
    featureProduct:null,
    isApply:false,
    Copan:null,
    isVerify:false,
    verified:false,
    isPlacing:false,
    isOrder:false,
    orderData:null,
    createProduct:async(data)=>{
        try{
            set({isCreating:true})
            let res=await axiosInstance.post("/admin/add-product",data);
            toast.success("product added sucessfully");
            set((state) => ({
                products: [...state.products, res?.data?.newProduct],
              }));
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to add product");
        }finally{
            set({isCreating:false})
        }
    },
    fetchAllproduct:async()=>{
        try{
            set({isFetching:true});
            let res=await axiosInstance.get("/admin/get-all-product");
            set({products:res?.data?.products});
        }catch(err){
            console.log(err?.message)
            throw new Error(err?.response?.data?.message||"Failed to fetch product");
        }finally{
            set({isFetching:false});
        }
    },
    fetchSingle:async(id)=>{
        try{
            let res=await axiosInstance.get(`/user/view-product/${id}`);
            return res?.data
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch protect");
        }
    },
    updateProduct:async(id,data)=>{
        try{
            set({isUpdating:true});
            let res=await axiosInstance.post(`/admin/edit-product/${id}`,data);
            toast.success("product updated successfully");
        }catch(err){
            throw new Error(err?.response?.data?.message);
        }finally{
            set({isUpdating:false})
        }
    },
    deleteProduct:async(id)=>{
        try{
           let res=await axiosInstance.get(`/admin/delete-product/${id}`);
           toast.success("prodct deleted successfully");
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to delete the product");
        }
    },
    updateFeature:async(id)=>{
        try{
            let res=await axiosInstance.get(`/admin/update-product/${id}`)
            toast.success("product made feature..")
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to update as feature")
        }
    },
    fetchCartItems:async()=>{
        try{
            set({isCart:true});
            let res=await axiosInstance.get('/user/get-cart-items');
            set({cart:res?.data});
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch cart items");
        }finally{
            set({isCart:false});
        }
    },
    increamentCount:async(id)=>{
        try{
            if(!id)toast.error("require id is missing");
            let res=await axiosInstance.get(`/user/increment/${id}`)
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to increase count");
        }
    },
    decreamentCount:async(id)=>{
        try{
            if(!id)toast.error("require id is missing");
            let res=await axiosInstance.get(`/user/decrement/${id}`)
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to increase count");
        }
    },
    removeFromCart:async(id)=>{
        try{
            if(!id)toast.error("require id is missing");
            let res=await axiosInstance.get(`/user/remove-from-cart/${id}`);
            
            toast.success(res?.data?.message)

        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to removed")
        }
    },
    getFeaturedProduct:async()=>{
        try{
            set({isf:true})
            let res=await axiosInstance.get('/user/get-featured-product');
            set({featureProduct:res?.data});
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch data");
        }finally{
            set({isf:false})
        }
    },
    applyCopan:async()=>{
        try{
            console.log("calledin useProduct")
            set({isApply:true})
            let res=await axiosInstance.get("/copan/get-copan");
            console.log(res?.data)
            set({Copan:res?.data?.copan})
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch copan");
        }finally{
            set({isApply:false})
        }
    },
    verifyCopan:async(copan)=>{
        try{
            if(!copan) return toast.error('require copan name is missing');
            set({isVerify:true});
            let res=await axiosInstance.post("/copan/validate-copan",{copan});
            toast.success("copan added to order");
            set({verified:true})
        }catch(err){
            throw new Error(err?.response?.data?.message||"Failed to verify")
        }finally{
            set({isVerify:false});
        }
    },
    placeOrder:async(copan)=>{
        try{
            set({isPlacing:true})
            let res=await axiosInstance.post("/order/place-order",{copanName:copan||""})
            toast.success(res?.data?.message||"order placed successfully");

        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to add copan");
        }finally{
            set({isPlacing:false})
        }
    },
    getAllOrders:async()=>{
        try{
            set({isOrder:true});
            let res=await axiosInstance.get("/order/get-order-data");
            console.log(res?.data)
            set({orderData:res?.data});
        }catch(err){
            throw new Error(err?.response?.data?.message||"failed to fetch");
        }finally{
            set({isOrder:false})
        }
    }
}))
export default useProduct;