import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDb } from "./libs/db.js"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import userRoutes from "./routes/user.routes.js"
import copanRoutes from "./routes/copan.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
dotenv.config();
let app=express();
app.use(cors({credentials:true,origin:"http://localhost:3001"}));
app.use(cookieParser());
app.use(express.json({limit:"20mb"}));
app.use(express.urlencoded({limit:'20mb',extended:true}))
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/user",userRoutes);
app.use("/api/copan",copanRoutes);
app.use("/api/order",paymentRoutes);
app.listen(process.env.PORT,async()=>{
    console.log("server start",process.env.PORT);
    await connectDb();
})