import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

//stripe public key maksuja varten ostoskoriin, sandbox eli testitilassa

const stripePromise = loadStripe(
  "pk_test_51RNyRyBDQOWIa4uWLmhTsTPG7jUIU0Lj1A6F0zLMPOndrp8wNFVhQPkJwwKnEkyFobcxOO3LwLJitYgRFFY4aIDy000eHuouim"
);

//komponentti tilauksen yhteenvedolle

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-pink-300 bg-white/80 p-4 shadow-lg sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-rose-800">Tilauksen yhteenveto</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-pink-600">Alkuperäinen hinta</dt>
            <dd className="text-base font-medium text-rose-800">€{formattedSubtotal}</dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-pink-600">Säästö</dt>
              <dd className="text-base font-medium text-rose-600">-€{formattedSavings}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-pink-600">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-rose-600">-{coupon.discountPercentage}%</dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-pink-300 pt-2">
            <dt className="text-base font-bold text-rose-800">Yhteensä</dt>
            <dd className="text-base font-bold text-pink-600">€{formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Kassalle
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-pink-400">tai</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 underline hover:text-pink-500 hover:no-underline"
          >
            Takaisin ostoksille
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
