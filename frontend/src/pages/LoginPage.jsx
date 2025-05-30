import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft, Loader } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
	const loading = false;
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-rose-800">
					Kirjaudu sisään
				</h2>
			</motion.div>

			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className="backdrop-blur-md bg-white/80 py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-pink-300">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-rose-800">
								Sähköposti
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-pink-400" aria-hidden="true" />
								</div>
								<input
									id="email"
									type="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className="block w-full px-3 py-2 pl-10 bg-white border border-pink-300 rounded-md shadow-sm placeholder-pink-400 text-rose-900 focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
									placeholder="you@example.com"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-rose-800">
								Salasana
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-pink-400" aria-hidden="true" />
								</div>
								<input
									id="password"
									type="password"
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									className="block w-full px-3 py-2 pl-10 bg-white border border-pink-300 rounded-md shadow-sm placeholder-pink-400 text-rose-900 focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition duration-150 ease-in-out disabled:opacity-50"
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
									Ladataan...
								</>
							) : (
								<>
									<LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
									Kirjaudu sisään
								</>
							)}
						</button>
					</form>

					<p className="mt-8 text-center text-sm text-rose-700">
						Ei vielä tiliä?{" "}
						<Link to="/signup" className="font-medium text-pink-600 hover:text-pink-500">
							Luo tili <ArrowLeft className="inline h-4 w-4" />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
