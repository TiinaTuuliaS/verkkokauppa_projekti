import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnalyticsTab from "../components/AnalyticsTab";
import ProductsList from "../components/ProductsList";
import CreateProductForm from "../components/CreateProductForm";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Luo tuote", icon: PlusCircle },
	{ id: "products", label: "Tuotteet", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytiikka", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const {fetchAllProducts} = useProductStore();

	
	useEffect(() => {
		fetchAllProducts()
	}, [fetchAllProducts]);


	return (
		<div className='min-h-screen relative overflow-hidden bg-pink-100 bg-opacity-40'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-rose-800 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin-hallintapaneeli
				</motion.h1>

				<div className='flex justify-center mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md font-medium transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-rose-600 text-white"
									: "bg-white text-rose-700 hover:bg-pink-200 border border-pink-300"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>

				{activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList />}
				{activeTab === "analytics" && <AnalyticsTab />}
			</div>
		</div>
	);
};

export default AdminPage;
