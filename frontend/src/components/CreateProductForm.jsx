import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["korvakorut", "sormukset", "aurinkolasit", "korusetit", "rannekorut", "kaulakorut"]; //jos muokkaat näitä pitää muokata myös homepage

//komponentti tuottteen lisäämiselle admin dashboardissa

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, loading} = useProductStore();	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch (error) {
			console.log("Virhe tuotteen luomisessa", error.message);
		}
	};

	/*
  Kuvan lataamisen käsittelijä funktio
*/
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if(file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};
			reader.readAsDataURL(file); //base 64 formaatti
		}
	};

	return (
		<motion.div
			className='bg-pink-100 bg-opacity-80 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto border border-pink-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-rose-800'>Luo uusi tuote</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>

				<div>
					<label htmlFor='name' className='block text-sm font-medium text-rose-900'>
						Tuotteen nimi
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full bg-white border border-pink-300 rounded-md shadow-sm py-2 px-3 text-rose-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-rose-900'>
						Kuvaus
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full bg-white border border-pink-300 rounded-md shadow-sm py-2 px-3 text-rose-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-rose-900'>
						Hinta
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='mt-1 block w-full bg-white border border-pink-300 rounded-md shadow-sm py-2 px-3 text-rose-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400'
						required
					/>
				</div>

				<div>
					<label htmlFor='category' className='block text-sm font-medium text-rose-900'>
						Kategoria
					</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full bg-white border border-pink-300 rounded-md shadow-sm py-2 px-3 text-rose-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400'
						required
					>
						<option value=''>Valitse kategoria</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*'onChange={handleImageChange} />
					
					<label
						htmlFor='image'
						className='cursor-pointer bg-white py-2 px-3 border border-pink-300 rounded-md shadow-sm text-sm leading-4 font-medium text-rose-900 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Lataa kuva
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-rose-700'>Kuva ladattu!</span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Ladataan...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Luo tuote
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;
