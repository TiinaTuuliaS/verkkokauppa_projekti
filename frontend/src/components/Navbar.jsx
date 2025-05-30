import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const user = false;
	const isAdmin = false;

	// Esimerkin vuoksi dummy cart
	const cart = [1, 2]; // Tämä pitää korvata oikealla state/datalla

	return (
		<header className='fixed top-0 left-0 w-full bg-pink-100 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-pink-300'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-rose-800 items-center space-x-2 flex'>
						Dreamland
					</Link>

					<nav className='flex flex-wrap items-center gap-4'>
						<Link
							to={"/"}
							className='text-rose-900 hover:text-pink-600 transition duration-300 ease-in-out'
						>
							Home
						</Link>

						<Link
							to={"/cart"}
							className='relative group text-rose-900 hover:text-pink-600 transition duration-300 ease-in-out'
						>
							<ShoppingCart className='inline-block mr-1 group-hover:text-pink-600' size={20} />
							<span className='hidden sm:inline'>Ostoskori</span>
							{cart.length > 0 && (
								<span
									className='absolute -top-2 -left-2 bg-rose-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-rose-400 transition duration-300 ease-in-out'
								>
									{cart.length}
								</span>
							)}
						</Link>

						{isAdmin && (
							<Link
								to={"/admin"}
								className='bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center'
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button className='bg-rose-600 hover:bg-rose-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Kirjaudu ulos</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-2' size={18} />
									Rekisteröidy
								</Link>
								<Link
									to={"/login"}
									className='bg-pink-700 hover:bg-pink-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
