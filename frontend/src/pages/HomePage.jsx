import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";

// Tuotekategoriat
const categories = [
  { href: "/korvakorut", name: "Korvakorut", imageUrl: "/korvakoru1.jpg" },
  { href: "/sormukset", name: "Sormukset", imageUrl: "/sormus1.jpg" },
  { href: "/aurinkolasit", name: "Aurinkolasit", imageUrl: "/lasit.jpeg" },
  { href: "/korusetit", name: "Korusetit", imageUrl: "/setti1.jpeg" },
  { href: "/rannekorut", name: "Rannekorut", imageUrl: "/rannekoru1.jpg" },
  { href: "/kaulakorut", name: "Kaulakorut", imageUrl: "/kaulakoru1.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, featuredProducts, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 text-rose-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-5xl sm:text-6xl font-bold text-rose-800 mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tuotteet
        </motion.h1>

        <motion.p
          className="text-center text-xl text-rose-700 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Viimeisimmät koruihastuksesi!
        </motion.p>

        {/* Kategoriat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <CategoryItem category={category} key={category.name} index={index} />
          ))}
        </div>

        {/* Featured Products */}
        {featuredProducts?.length > 0 && (
          <FeaturedProducts featuredProducts={featuredProducts} />
        )}
        {loading && <p className="text-center text-lg text-gray-500">Ladataan tuotteita...</p>}
        {!loading && featuredProducts?.length === 0 && (
          <p className="text-center text-lg text-gray-500">Ei suosikkituotteita tällä hetkellä.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;