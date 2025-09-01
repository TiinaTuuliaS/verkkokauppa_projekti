import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Navbar from "./components/Navbar.jsx"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import { useCartStore } from "./stores/useCartStore";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import AdminPage from "./pages/AdminPage.jsx"
import CategoryPage from "./pages/CategoryPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx" 
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx"


function App() {
  const { user,  checkAuth, checkingAuth} = useUserStore();
  const { getCartItems } = useCartStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;


  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
{/* Taustan gradientväri */}
<div className="absolute inset-0">
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(255,245,230,0.8)_0%,_rgba(255,192,203,0.6)_50%,_rgba(255,228,225,0.4)_100%)]" />
</div>

<div className="relative z-50 pt-20">
      <Navbar/>

      
<Routes>
<Route path="/" element={<HomePage/>} />
<Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to="/" />} />
<Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/" /> } />
<Route path='/secret-dashboard'
element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}


					/>
  	<Route path='/category/:category' element={<CategoryPage />} />
      	<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
        	<Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
          <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
</Routes>

  </div>

	<Toaster />

    </div>
  )
}

export default App
