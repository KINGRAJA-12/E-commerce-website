import React, { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import toast from "react-hot-toast";
import useProduct from "../../others/useProduct.jsx";
import {loadStripe} from "@stripe/stripe-js";
import { axiosInstance } from "../../others/axiosInstances.js";
let stripePromise=loadStripe('pk_test_51QvG17L7ijQZ5SUW07utC0dmmFbiKjuUErDtJYRzsglQ7qxavjeR3B1usuXeSzmnLCV6kBBnqFLJ06guLiD62IJa00KPvJfoFd')
const Order = () => {
  let { isOrder, orderData, getAllOrders } = useProduct();
  let [isPay,setIsPay]=useState(null)
  useEffect(() => {
    let fetch = async () => {
      try {
        await getAllOrders();
      } catch (err) {
        toast.error(err?.message);
      }
    };
    fetch();
  }, []);
let handleSubmit=async(orderId)=>{
  try{
    setIsPay(orderId);
    if(!orderId)return toast.error("required id is missing");
    let res=await axiosInstance.post("/order/check-out",{orderId});
    let {url,sessionId}=res?.data;
    if(!sessionId)return toast.error("failed");
    let stripe=await stripePromise;
    let reslt=await stripe.redirectToCheckout({sessionId});
    if(reslt.error)console.log(reslt.error.message);

  }catch(err){

  }finally{
    setIsPay(null)
  }
}
  return (
    <div className="w-full h-full flex justify-center items-center p-4 relative">
      <div className="w-[720px] max-w-4xl h-[80%] bg-[#0a2636] hover:bg-gray-900 transition-all duration-300 ease-linear rounded-lg shadow-lg shadow-black overflow-hidden">
        <div className="overflow-y-auto max-h-[600px] scroll">
          <table className="w-full text-left text-white">
            <thead className="bg-gray-700 sticky top-0 left-0 text-sm font-semibold uppercase h-12">
              <tr>
                <th className="px-4 py-2" colSpan={4}>Products</th>
                <th className="px-4 py-2">discount</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Make Payment</th>
              </tr>
            </thead>
            <tbody>
              {isOrder ? (
                <tr>
                  <td colSpan={6} className="text-center py-3 text-white">
                    Fetching, please wait...
                  </td>
                </tr>
              ) : orderData && orderData.length > 0 ? (
                orderData.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-b border-gray-700 hover:bg-gray-800 transition duration-200 cursor-pointer"
                  >
                    <td colSpan={4}>
                      {item.orders.map((data, idx) => (
                        <div key={data.product._id || idx} className="flex items-center gap-4 p-2">
                          <img
                            src={data.product.image}
                            alt={data.product.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span>{data.product.name}</span>
                          <span className="ml-auto">{data.quantity}</span>
                          <span>{data.cost}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-1">
                      {item?.discount}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-1">
                      <FaIndianRupeeSign /> <span>{item?.totalCost}</span>
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        item?.Status === "not paid" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item?.Status}
                    </td>
                    <td className="px-4 py-3">
                      <button className="bg-green-500 text-white rounded-lg p-2 hover:bg-green-600 text-sm" onClick={()=>handleSubmit(item?._id)}>
                       {isPay===item?._id?"processing..":"Pay Online"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-3 text-white">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
