import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";

const SignUpPage = () => {
	const loading = false;
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
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
				<h2 className="mt-6 text-center text-3xl font-extrabold text-rose-800">Luo tilisi</h2>
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
							<label htmlFor="name" className="block text-sm font-medium text-rose-800">
								Nimi
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-pink-400" aria-hidden="true" />
								</div>
								<input
									id="name"
									type="text"
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className="block w-full px-3 py-2 pl-10 bg-white border border-pink-300 rounded-md shadow-sm placeholder-pink-400 text-rose-900 focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
									placeholder="Nimesi"
								/>
							</div>
						</div>

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
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className="block w-full px-3 py-2 pl-10 bg-white border border-pink-300 rounded-md shadow-sm placeholder-pink-400 text-rose-900 focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-rose-800">
								Toista salasana
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-pink-400" aria-hidden="true" />
								</div>
								<input
									id="confirmPassword"
									type="password"
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
									Lataa...
								</>
							) : (
								<>
									<UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
									Rekisteröidy
								</>
							)}
						</button>
					</form>

					<p className="mt-8 text-center text-sm text-rose-700">
						Onko sinulla jo tili?{" "}
						<Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
							Kirjaudu sisään täällä <ArrowRight className="inline h-4 w-4" />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
