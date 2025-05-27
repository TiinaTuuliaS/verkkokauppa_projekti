import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Navbar from "./components/Navbar.jsx"


function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
{/* Taustan gradientväri */}
<div className="absolute inset-0">
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(255,245,230,0.8)_0%,_rgba(255,192,203,0.6)_50%,_rgba(255,228,225,0.4)_100%)]" />
</div>

      <Navbar/>
<Routes>

<Route path="/" element={<HomePage/>} />
<Route path="/signup" element={<SignUpPage/>} />
<Route path="/login" element={<LoginPage/>} />




</Routes>





    </div>
  )
}

export default App
