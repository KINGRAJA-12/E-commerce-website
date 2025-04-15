import mongoose from "mongoose";

// Define Order Schema
let orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    orders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        cost: {
          type: Number,
        },
      },
    ],
    totalCost: {
      type: Number,
    },
    discount: {
      type: String,
      default: "0%",
    },
    stripeSessionId: {
      type: String,
    },
    Status: {
      type: String,
      enum: ["paid", "not paid"],
      required: true,
      default: "not paid",
    },
  },
  { timestamps: true }
);

// Create and Export Order Model
let Order = mongoose.model("orders", orderSchema);
export default Order;
