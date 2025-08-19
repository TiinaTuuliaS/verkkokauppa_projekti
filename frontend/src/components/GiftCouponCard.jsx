import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore(); //haetaan cartstoressa luodut funktiot

  //haetaan kuponki
  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-pink-300 bg-white/80 p-4 shadow-lg sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-rose-800">
            Onko sinulla kuponki tai lahjakortti?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-pink-300 bg-white p-2.5 text-sm text-rose-900 placeholder-pink-400 focus:border-pink-500 focus:ring-pink-500"
            placeholder="lisää koodi tähän"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>

        <motion.button
          type="button"
          className="flex w-full items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Lisää koodi
        </motion.button>
      </div>

      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-rose-800">Kuponki tallennettu</h3>
          <p className="mt-2 text-sm text-pink-600">
            {coupon.code} - {coupon.discountPercentage}% alennusta
          </p>
          <motion.button
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Poista kuponki
          </motion.button>
        </div>
      )}

      {coupon && !isCouponApplied && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-rose-800">Saatavilla oleva kuponki:</h3>
          <p className="mt-2 text-sm text-pink-600">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
