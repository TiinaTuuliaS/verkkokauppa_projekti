import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	// const [editingProduct, setEditingProduct] = useState(null); const handleEdit = (product) => { setEditingProduct(product); };
	// esimerkki tilamuuttujasta tuotteen muokkaustoimintoa varten ei valmis

	return (
		<motion.div
			className='bg-pink-50 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className='min-w-full divide-y divide-pink-200'>
				<thead className='bg-pink-100'>
					<tr>
						{["Product", "Price", "Category", "Featured", "Actions"].map((heading) => (
							<th
								key={heading}
								scope='col'
								className='px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider'
							>
								{heading}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='bg-pink-50 divide-y divide-pink-200'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-pink-100 transition duration-200'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-full object-cover border border-pink-300'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-rose-800'>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-rose-600'>${product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-rose-600'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full ${
										product.isFeatured
											? "bg-yellow-300 text-rose-900"
											: "bg-pink-200 text-rose-600"
									} hover:bg-yellow-400 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-rose-500 hover:text-red-400 transition-colors duration-200'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};

export default ProductsList;


