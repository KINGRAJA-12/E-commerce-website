import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config()
console.log(process.env.STRIP_SECRETE_KEY||"empty")
export const stripe=new Stripe(process.env.STRIP_SECRETE_KEY)