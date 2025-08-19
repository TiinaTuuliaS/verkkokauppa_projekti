import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();
	const { category } = useParams();

	// Lightbox-tila
	const [lightboxImage, setLightboxImage] = useState(null);

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	return (
		<div className="min-h-screen bg-pink-100 bg-opacity-40">
			<div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
				<motion.h1
					className="text-center text-4xl sm:text-5xl font-bold text-rose-800 mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<h2 className="text-3xl font-semibold text-rose-400 text-center col-span-full">
							Ei vielä tuotteita
						</h2>
					)}

					{products?.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							onImageClick={() => setLightboxImage(product.image)}
						/>
					))}
				</motion.div>
			</div>

			{/* Lightbox / Suurennettu kuva */}
			{lightboxImage && (
				<motion.div
					className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setLightboxImage(null)}
				>
					<motion.img
						src={lightboxImage}
						alt="Suurennettu tuotekuva"
						className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.3 }}
					/>
				</motion.div>
			)}
		</div>
	);
};

export default CategoryPage;


