import express from 'express';
import { addToCart,increamentCount,decreamentCount,removeFromCart, viewProduct, fetchOthers, getCartItems, getFeaturedProduct } from '../controllers/user.controller.js';
import { protect } from '../middlewars/proteced.middlewars.js';
import { getallProducts } from '../controllers/admin.controller.js';
let userRoutes=express.Router();
userRoutes.get("/add-to-cart/:productId",protect,addToCart);
userRoutes.get("/increment/:productId",protect,increamentCount);
userRoutes.get("/decrement/:productId",protect,decreamentCount);
userRoutes.get("/remove-from-cart/:productId",protect,removeFromCart);
userRoutes.get("/view-product/:id",protect,viewProduct);
userRoutes.get("/get-all",protect,getallProducts);
userRoutes.get("/fetch-other/:id",protect,fetchOthers);
userRoutes.get("/get-cart-items",protect,getCartItems);
userRoutes.get("/get-featured-product",protect,getFeaturedProduct)
export default userRoutes;