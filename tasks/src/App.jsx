import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" // Import React Router components
import Header from "./Components/Header"
import Content from "./Components/Content"
import Cart from "./Components/Cart"
 import Footer from "./Components/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"




const App = () => (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    <Footer />
  </Router>
)

export default App
