import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";


//tuotteen näkymä ostoskorissa
const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="flex flex-col rounded-lg border border-pink-300 bg-white/80 shadow-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="shrink-0 md:order-1">
          <img
            className="h-20 md:h-32 rounded-xl object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>

        <div className="flex flex-col flex-1 space-y-2 md:order-2 md:max-w-md">
          <p className="text-lg font-semibold text-rose-800 hover:text-rose-600 hover:underline cursor-pointer">
            {item.name}
          </p>
          <p className="text-sm text-pink-600">{item.description}</p>

          <button
            className="self-start text-sm font-medium text-red-500 hover:text-red-400 hover:underline flex items-center gap-1"
            onClick={() => removeFromCart(item._id)}
            aria-label={`Poista ${item.name} ostoskorista`}
          >
            <Trash size={16} />
            Poista
          </button>
        </div>

        <div className="flex items-center justify-between md:order-3 md:justify-end md:w-36 gap-4">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-pink-300 bg-pink-100 text-pink-600 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              aria-label={`Vähennä ${item.name} määrää`}
            >
              <Minus size={16} />
            </button>
            <p className="text-lg font-semibold text-rose-800">{item.quantity}</p>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-pink-300 bg-pink-100 text-pink-600 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              aria-label={`Lisää ${item.name} määrää`}
            >
              <Plus size={16} />
            </button>
          </div>

          <p className="text-lg font-bold text-pink-600">€{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

