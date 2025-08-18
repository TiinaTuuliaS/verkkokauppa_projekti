import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);

  //funktio joka käsittelee onnistuneen tilauksen axiospyynnön 

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("Session id:tä ei löydy");
    }
  }, [clearCart]);

  if (isProcessing) return "Käsitellään...";
  if (error) return `Virhe: ${error}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-pink-100 bg-opacity-40">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-pink-300 relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-rose-800 mb-2">
            Tilauksesi onnistui!
          </h1>

          <p className="text-gray-700 text-center mb-2">
            Kiitos ostoksestasi. Me käsittelemme sen nyt.
          </p>
          <p className="text-rose-700 text-center text-sm mb-6">
            Katso sähköpostista tilausvahvistus ja tilauksen tiedot.
          </p>

          <div className="bg-pink-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-rose-700">Tilausnumero</span>
              <span className="text-sm font-semibold text-rose-800">#12345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-rose-700">Arvioitu saapumisaika</span>
              <span className="text-sm font-semibold text-rose-800">3-5 päivää</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Kiitos kun teit ostoksia pienyrittäjältä
            </button>

            <Link
              to={"/"}
              className="w-full bg-pink-200 hover:bg-pink-300 text-rose-800 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              Takaisin kauppaan
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
