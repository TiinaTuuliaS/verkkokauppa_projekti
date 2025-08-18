import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-pink-100 bg-opacity-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-pink-300"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-rose-800 mb-2">
            Tilauksen peruutus
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Tilauksesi on peruutettu. Maksua ei veloitettu.
          </p>
          <div className="bg-pink-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-rose-700 text-center">
              Jos kohtasit ongelmia maksuprosessin aikana, ota yhteyttä.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to={"/"}
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Takaisin kauppaan
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
