import CategoryItem from "../components/CategoryItem";

const categories = [
	{ href: "/korvakorut", name: "Korvakorut", imageUrl: "/korvakoru1.jpg" },
	{ href: "/sormukset", name: "Sormukset", imageUrl: "/sormus1.jpg" },
	{ href: "/aurinkolasit", name: "Aurinkolasit", imageUrl: "/lasit.jpeg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/rannekorut", name: "Rannekorut", imageUrl: "/rannekoru1.jpg" },
	{ href: "/kaulakorut", name: "Kaulakorut", imageUrl: "/kaulakoru1.jpg" },
];

const HomePage = () => {
	return (
		<div className='relative min-h-screen bg-pink-100 text-rose-900 overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-rose-800 mb-4'>
					Tuotteet
				</h1>
				<p className='text-center text-xl text-rose-700 mb-12'>
					Viimeisimmät koruihastuksesi!
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
