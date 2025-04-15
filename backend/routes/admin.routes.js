import {addProduct,editProduct,updateFeature,deleteProduct,getWeeklySales,getProductSales,getallProducts, analysisData} from "../controllers/admin.controller.js";
import express from "express";
import { protect,isAdmin } from "../middlewars/proteced.middlewars.js";
let adminRoutes=express.Router();
adminRoutes.post("/add-product",protect,isAdmin,addProduct);
adminRoutes.post("/edit-product/:id",protect,isAdmin,editProduct);
adminRoutes.get("/update-product/:id",protect,isAdmin,updateFeature);
adminRoutes.get("/delete-product/:id",protect,isAdmin,deleteProduct);
adminRoutes.get("/get-all-product",protect,isAdmin,getallProducts);
adminRoutes.get("/get-weekly-sales",protect,isAdmin,getWeeklySales);
adminRoutes.get("/get-sales",protect,isAdmin,getProductSales);
adminRoutes.get("/get-analysis",protect,isAdmin,analysisData)
export default adminRoutes;