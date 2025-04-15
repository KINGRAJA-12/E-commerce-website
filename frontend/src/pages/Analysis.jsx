import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import toast from "react-hot-toast";
import { axiosInstance } from "../../others/axiosInstances";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a32cc4", "#FF6384"];

const Analysis = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-analysis");
        const data = res?.data;

        // Format _id as date string for LineChart XAxis
        const formattedLineData = (data?.lineChartData || []).map(item => ({
          ...item,
          _id: new Date(item._id).toLocaleDateString(),
        }));

        setLineChartData(formattedLineData);
        setBarChartData(data?.barChartData || []);
        setPieChartData(data?.pieChartData || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch analysis");
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 space-y-10 min-h-screen text-white">
      <h2 className="text-2xl font-bold text-center">Sales Analysis</h2>
      <div className="bg-white text-black shadow p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Revenue Over Last 7 Days</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData} className="bg-inherit">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white text-black shadow p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Product Sales & Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="productName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSold" fill="#82ca9d" name="Quantity Sold" />
            <Bar dataKey="totalRevenue" fill="#8884d8" name="Total Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white text-black shadow p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Revenue Distribution by Product</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analysis;
