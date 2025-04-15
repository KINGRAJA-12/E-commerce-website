import Stripe from "stripe"
import Copan from "../models/copan.model.js"
import User from "../models/user.model.js"
import Product from "../models/product.model.js"
import Order from "../models/order.model.js"
import { stripe } from "../libs/strip.js"

export const payment=async(req,res,next)=>{
    try{
        let userId=req?.user?._id;
        let {orderId}=req?.body;
        let orders=await Order.findOne({_id:orderId,userId:userId,Status:"not paid"});
        if(!orders){
            return res.status(400).json({message:"no such order found"});
        }
        let line_items = await Promise.all(
            orders.orders.map(async (item) => {
                let product = await Product.findById(item.product);
                if (!product) return null; 
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: [product.image],
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: item.quantity,
                };
            })
        );
        let total_amount=orders?.totalCost;
        let session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata:{
                userId:userId.toString(),
                total_amount,
                orderId
            }
        });

        return res.status(200).json({ url: session.url,total_amount,sessionId:session.id});

    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const paymentSuccess=async(req,res,next)=>{
    try{
        let {session_id}=req.query;
        if(!session_id){
            return res.status(400).json({message:"require session is missing"});
        }
        let session=await stripe.checkout.sessions.retrieve(session_id);
        if(!session){
            return res.status(400).json({message:"Require session is missing"});
        }
        let newCopan=false
        let userId=session?.metadata?.userId
        if(session.metadata.total_amount>20000){
            let copanName="GIFT_"+Math.floor(10000+Math.random()*90000);
            let discountpercentage=Math.floor(Math.random()*21);
            let expireAt=new Date()
            expireAt.setTime(expireAt.getTime() + 7 * 24 * 60 * 60 * 1000);
           let copan=await Copan.create({copanName,discountpercentage,expiredate:expireAt,userId,isActive:true});
           newCopan=true
        }
        let order=await Order.findOne({userId:userId,Status:"not paid",_id:session?.metadata?.orderId});
        order.stripeSessionId=session_id;
        order.Status="paid"
        await order.save()
        return res.status(200).json({amount:session?.metadata?.total_amount||0,newCopan});

    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const placeOrder=async(req,res,next)=>{
    try{
        let userId=req.user?._id;
        let user=await User.findById(userId);
        let {copanName}=req.body;
        let discountpercentage=0;
        let copan=await Copan.findOne({copanName:copanName,isActive:true,userId:userId});
        if(copan){
            discountpercentage=copan?.discountpercentage;
            copan.isActive=false;
            await copan.save();
        }
        let newOrder=new Order({userId:userId});
        if(user.cartItems.length==0){
            return res.status(400).json({message:"No items find"});
        }
        let total_amount=0;
        newOrder.orders=await Promise.all(user.cartItems.map(async(item)=>{
            let product=await Product.findById(item?.product);
            let totalItemCost=item.quantity*product.price;
            total_amount+=totalItemCost;
            return{
                product:product?._id,
                quantity:item.quantity,
                cost:product.price
            }
        }));
        console.log("total amount",total_amount);
        if(discountpercentage!==0){
            total_amount=total_amount-((discountpercentage/100)*total_amount)
            
        }
        newOrder.totalCost=Math.floor(total_amount);
        newOrder.discount=discountpercentage.toString()+"%";
        user.cartItems=[];
        await user.save()
        let saveOrder=await newOrder.save();
        return res.status(200).json({message:"order please successfully"});

    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const getOrderData = async (req, res, next) => {
    try {
      let userId = req?.user?._id;
  
      let orders = await Order.find({ userId })
        .populate("userId", "-password")
        .populate({
          path: "orders.product",
          model: "product",
        })
        .exec();
  
      return res.status(200).json(orders);
    } catch (err) {
      console.error("Error fetching orders:", err?.message);
      return res.status(500).json({ message: err?.message });
    }
  };
  