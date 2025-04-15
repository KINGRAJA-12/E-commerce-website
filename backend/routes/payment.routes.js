import express from "express"
import { getOrderData, payment,paymentSuccess,placeOrder } from "../controllers/payment.controller.js"
import { protect } from "../middlewars/proteced.middlewars.js"
let paymentRoutes=express.Router();
paymentRoutes.post("/check-out",protect,payment);
paymentRoutes.get("/payment-success",protect,paymentSuccess);
paymentRoutes.post("/place-order",protect,placeOrder);
paymentRoutes.get("/get-order-data",protect,getOrderData);
export default paymentRoutes;
