import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Ei suosikkituotteita tällä hetkellä.
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl sm:text-6xl font-bold text-rose-700 mb-8 drop-shadow-md">
          Esittelyssä
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 px-2"
                  style={{ flexBasis: `${100 / itemsPerPage}%` }}
                >
                  <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-rose-300">
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-rose-800">{product.name}</h3>
                      <p className="text-rose-600 font-medium mb-4">
                        {product.price.toFixed(2)} €
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Lisää ostoskoriin
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isStartDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-500"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isEndDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-500"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
