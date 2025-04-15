import Product from "../models/product.model.js";
import cloudinary from "../libs/cloudinary.js";
import Order from "../models/order.model.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const getallProducts=async(req,res,next)=>{
    try{
        let products=await Product.find({});
        return res.status(200).json({products});
    }
    catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const addProduct=async(req,res,next)=>{
    try{
       // let image=req.file
        let {name,describtion,image,price}=req?.body;
        //console.log(req.body)
        if(!name|| !describtion || !image || !price){
            return res.status(400).json({message:"All fiels is required"});
        }
        let result=await cloudinary.uploader.upload(image)
        //console.log(result.secure_url)
        let imgUrl=result?.secure_url||"";
        let newProduct=new Product({name,describtion,image:imgUrl,price});
        await newProduct.save();
        return res.status(201).json({newProduct});
        
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const editProduct=async(req,res,next)=>{
    try{
        let id=req.params.id;
        if(!id){
            return res.status(400).json({message:"url mismatch"})
        }
        let {pname,pdescribtion,pimage,pprice}=req.body;
        let fetchProduct=await Product.findById(id);
        let name=pname||fetchProduct?.name;
        let describtion=pdescribtion||fetchProduct?.describtion;
        let price=pprice||fetchProduct?.price;
        let image=null||fetchProduct.image;
        if(pimage){
            let cid=fetchProduct.image.split("/").pop().split('.')[0];
            await cloudinary.uploader.destroy(`${cid}`);
            let result=await cloudinary.uploader.upload(pimage);
            //console.log(result.secure_url)
            image=result?.secure_url;
        }
        fetchProduct.name=name;
        fetchProduct.describtion=describtion;
        fetchProduct.price=price;
        fetchProduct.image=image;
        await fetchProduct.save();
        return res.status(200).json({message:"product edited successfully"});

    }
    catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }

}
export const updateFeature=async(req,res,next)=>{
    try{
        let id=req?.params?.id;
        if(!id){
            return res.status(400).json({message:'url mismatch'});
        }
        let fetchProduct=await Product.findById(id);
        fetchProduct.isFeatured=true;
        await fetchProduct.save();
        return res.status(200).json({message:"updated suvvessfuly"});
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const deleteProduct=async(req,res,next)=>{
    try{
        let id=req.params?.id;
        if(!id){
            return res.status(400).json({message:"require id is missing"});
        }
        let fetchProduct=await Product.findByIdAndDelete(id);
        //let cid=fetchProduct.image.split("/").pop().split('.')[0];
        //await cloudinary.uploader.destroy(`${cid}`);
        //let result=await cloudinary.uploader.upload(pimage);
        //console.log(result.secure_url)
        //image=result?.secure_url;

        return res.status(200).json({message:"Product deleted successfully"});
    }catch(err){
        console.log(err?.message)
        return res.status(500).json({message:err?.message})
    }
}
export const getWeeklySales = async (req, res) => {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const salesData = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$totalCost" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        console.log("sales data",salesData)
        return res.status(200).json({ success: true, salesData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const getSales=async(req,res)=>{
    try{

    }catch(err){
        console.log(err?.message)
        return res.status(500).json({message:err?.message});
    }
}
export const getProductSales = async (req, res) => {
    try {
        const productSales = await Order.aggregate([
            { $unwind: "$orders" },
            {
                $group: {
                    _id: "$orders.product",
                    totalSold: { $sum: "$orders.quantity" },
                    totalRevenue: { $sum: "$orders.cost" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    productName: { $arrayElemAt: ["$productDetails.name", 0] },
                    totalSold: 1,
                    totalRevenue: 1
                }
            }
        ]);
        console.log("productsales",productSales)
        return res.status(200).json({ success: true, productSales });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const analysisData=async (req, res) => {
    try {
      // 1. Line Chart: Daily Revenue in Last 7 Days
      const lineChartData = await Order.aggregate([
        {
          $match: {
            Status: "paid",
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            totalRevenue: { $sum: "$totalCost" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      // 2. Bar Chart: Product-wise Sales and Revenue
      const barChartData = await Order.aggregate([
        { $match: { Status: "paid" } },
        { $unwind: "$orders" },
        {
          $group: {
            _id: "$orders.product",
            totalSold: { $sum: "$orders.quantity" },
            totalRevenue: { $sum: "$orders.cost" }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo"
          }
        },
        { $unwind: "$productInfo" },
        {
          $project: {
            productId: "$_id",
            productName: "$productInfo.name",
            totalSold: 1,
            totalRevenue: 1
          }
        }
      ]);
  
      // 3. Pie Chart: Revenue Distribution by Product
      const pieChartData = barChartData.map(product => ({
        name: product.productName,
        value: product.totalRevenue
      }));
  
      res.json({
        success: true,
        lineChartData,
        barChartData,
        pieChartData
      });
    } catch (err) {
      console.error("Analysis error:", err);
      res.status(500).json({ success: false, message: "Failed to fetch analysis data" });
    }
  }
