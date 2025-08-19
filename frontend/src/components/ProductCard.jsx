import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ShoppingCart, X } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [isOpen, setIsOpen] = useState(false);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Kirjaudu sisään tehdäksesi ostoksia!", { id: "login" });
			return;
		} else {
			addToCart(product);
			toast.success("Tuote lisätty ostoskoriin!");
		}
	};

	// avautuneen kuvan sulkeminen esc näppäimellä
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		if (isOpen) {
			document.body.style.overflow = "hidden"; // estää scrollin
			window.addEventListener("keydown", handleKeyDown);
		} else {
			document.body.style.overflow = "auto"; // palauttaa scrollin kun kuva ei ole auki
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<>
			<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-pink-300 shadow-lg backdrop-blur-sm bg-white/80'>
				<div
					className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer'
					onClick={() => setIsOpen(true)}
				>
					<img className='object-cover w-full' src={product.image} alt={product.name} />
					<div className='absolute inset-0 bg-pink-100 bg-opacity-20' />
				</div>

				<div className='mt-4 px-5 pb-5'>
					<h5 className='text-xl font-semibold tracking-tight text-rose-800'>{product.name}</h5>
					<p className='mt-1 text-sm text-gray-600'>{product.description}</p>

					<div className='mt-2 mb-5 flex items-center justify-between'>
						<p>
							<span className='text-3xl font-bold text-pink-600'>€{product.price}</span>
						</p>
					</div>

					<button
						className='flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white
						hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300 transition duration-200 ease-in-out'
						onClick={handleAddToCart}
					>
						<ShoppingCart size={22} className='mr-2' />
						Ostoskoriin
					</button>
				</div>
			</div>

			{/* Lightbox ja kuvan suurentaminen klikatessa */}
			{isOpen && (
				<motion.div
					className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setIsOpen(false)}
				>
					<motion.img
						src={product.image}
						alt={product.name}
						className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg'
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.3 }}
						onClick={(e) => e.stopPropagation()} // estää sulkemisen kuvan klikillä
					/>
					<button
						className='absolute top-4 right-4 text-white bg-rose-600 hover:bg-rose-500 rounded-full p-2 focus:outline-none'
						onClick={() => setIsOpen(false)}
					>
						<X size={24} />
					</button>
				</motion.div>
			)}
		</>
	);
};

export default ProductCard;



