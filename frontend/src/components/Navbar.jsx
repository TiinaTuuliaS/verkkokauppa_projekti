import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-pink-100 bg-opacity-95 backdrop-blur-md shadow-lg z-50 border-b border-pink-300 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <Link to="/" className="text-3xl sm:text-4xl font-extrabold text-rose-800 flex items-center space-x-3">
            Dreamland
            <span className="text-xl sm:text-2xl font-semibold"></span>
          </Link>

          <nav className="flex flex-wrap items-center gap-6 text-lg">
            <Link
              to="/"
              className="text-rose-900 hover:text-pink-600 font-medium transition duration-300 ease-in-out"
            >
              Etusivu
            </Link>

            <Link
              to="/cart"
              className="relative group flex items-center text-rose-900 hover:text-pink-600 font-medium transition duration-300 ease-in-out"
            >
              <ShoppingCart className="inline-block mr-2 group-hover:text-pink-600" size={22} />
              <span>Ostoskori</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-rose-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold group-hover:bg-rose-400 transition duration-300 ease-in-out">
                  {cart.length}
                </span>
              )}
            </Link>

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out flex items-center gap-2"
              >
                <Lock size={20} />
                Dashboard
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition duration-300 ease-in-out"
              >
                <LogOut size={20} />
                Kirjaudu ulos
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition duration-300 ease-in-out"
                >
                  <UserPlus size={20} />
                  Rekisteröidy
                </Link>
                <Link
                  to="/login"
                  className="bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition duration-300 ease-in-out"
                >
                  <LogIn size={20} />
                  Kirjaudu
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

