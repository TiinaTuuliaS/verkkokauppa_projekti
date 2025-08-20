import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

//Funktio joka palauttaa perusanalytiikan tiedot (käyttäjät, tuotteet, myynnit, liikevaihto)

export const getAnalyticsData = async () => {
	const totalUsers = await User.countDocuments(); //käyttäjien määrä sivustolla
	const totalProducts = await Product.countDocuments(); //tuotteiden määrä

	//käytetään MongoDb ''pipelineä'' myyntidatan saamiseksi aggregate metodilla

	const salesData = await Order.aggregate([
		{
			$group: {
				_id: null, // grouppaa kaikki dokumentit yhteen ryhmään,
				totalSales: { $sum: 1 },
				totalRevenue: { $sum: "$totalAmount" },
			},
		},
	]);

	// Jos ei löytynyt yhtään tilausta, palautetaan nollat

	const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 }; 

	return {
		users: totalUsers,
		products: totalProducts,
		totalSales,
		totalRevenue,
	};
};

//tämän analytiikkaosion kanssa taistelemisessa ja ymmärtämisessä meni kauan, koska data mongodb syntax muodossa ja olen
//käyttänyt sitä tosi vähän, mutta kuitenkin onnistui. Aggregate minulle myös uutta, mutta aina mielenkiiutoista oppia.

// Funktio joka palauttaa myynti- ja liikevaihtodataa päivittäin annettujen päivämäärien väliltä

export const getDailySalesData = async (startDate, endDate) => {
	try {
		const dailySalesData = await Order.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate, //tilaukset tällä aikavälillä
						$lte: endDate,
					},
				},
			},
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, //päivämäärän mukaan ryhmittely
					sales: { $sum: 1 }, //tilausten määärä päivässä
					revenue: { $sum: "$totalAmount" }, //liikevaihto päivässä
				},
			},
			{ $sort: { _id: 1 } }, //aikajärjestys
		]);

		// esimerkki dailySalesData datasta arrayssa
		// [
		// 	{
		// 		_id: "2024-08-18",
		// 		sales: 12,
		// 		revenue: 1450.75
		// 	},
		// ]

		const dateArray = getDatesInRange(startDate, endDate);
		// console.log(dateArray) // ['2024-08-18', '2024-08-19', ... ] päivämäärä array esimerkki

		return dateArray.map((date) => {
			const foundData = dailySalesData.find((item) => item._id === date);

			// Palautetaan jokaiselle päivälle sales ja revenue (0 jos ei löytynyt myyntiä)

			return {
				date,
				sales: foundData?.sales || 0,
				revenue: foundData?.revenue || 0,
			};
		});
	} catch (error) {
		throw error;
	}
};

// Luo päivämääräarrayn annetun aikavälin sisällä (yyyy-mm-dd muodossa)

function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}