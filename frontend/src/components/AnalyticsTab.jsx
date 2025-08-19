import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, Euro } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({ users: 0, products: 0, totalSales: 0, totalRevenue: 0 });
  const [dailySalesData, setDailySalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analytics");
        console.log("API response:", response.data);

        const formattedData = response.data.dailySalesData.map(item => ({
          name: item.date || item.name,
          sales: item.sales || item.totalSales,
          revenue: item.revenue || item.totalRevenue,
        }));

        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(formattedData);
      } catch (error) {
        console.error("Virhe analytiikkadatan lataamisessa:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Kortit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard title="Käyttäjät" value={analyticsData.users} icon={Users} color="from-rose-200 to-rose-400" />
        <AnalyticsCard title="Tuotteet" value={analyticsData.products} icon={Package} color="from-rose-200 to-rose-400" />
        <AnalyticsCard title="Tilaukset" value={analyticsData.totalSales} icon={ShoppingCart} color="from-rose-200 to-rose-400" />
        <AnalyticsCard title="Kokonaismyynti" value={`€${analyticsData.totalRevenue}`} icon={Euro} color="from-rose-200 to-rose-400" />
      </div>

      {/* Kaavio */}
      <motion.div
        className="bg-rose-100 bg-opacity-80 shadow-lg rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySalesData}>
              {/* Gridin kontrasti että varmasti näkyy.... */}
              <CartesianGrid stroke="#DB2777" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#BE185D" />
              <YAxis stroke="#BE185D" />
              <Tooltip
                contentStyle={{ backgroundColor: '#FEE2E2', borderRadius: 8 }}
                labelStyle={{ color: '#9D174D', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ color: '#9D174D' }} />
              <Line type="monotone" dataKey="sales" stroke="#E11D48" activeDot={{ r: 8 }} name="Tilaukset" />
              <Line type="monotone" dataKey="revenue" stroke="#DB2777" activeDot={{ r: 8 }} name="Kokonaismyynti" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-white bg-opacity-90 rounded-lg p-6 shadow-lg overflow-hidden relative bg-gradient-to-br ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="flex justify-between items-center z-10">
      <div>
        <p className="text-rose-900 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-rose-800 text-3xl font-bold">{value}</h3>
      </div>
      <Icon className="h-12 w-12 text-rose-200/50" />
    </div>
  </motion.div>
);
