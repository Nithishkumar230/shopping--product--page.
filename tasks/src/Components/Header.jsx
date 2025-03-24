import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaFilter } from "react-icons/fa"; 

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
  const [isFilterDropdownVisible, setIsFilterDropdownVisible] = useState(false); 
  const [cart, setCart] = useState([]); 
  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <div className="headernav">
      <h1 className="logo">MyShop</h1>
      <div className="header-actions">
  
        <div
          className="login-container"
          onMouseEnter={() => setIsDropdownVisible(true)} 
          onMouseLeave={() => setIsDropdownVisible(false)} 
        >
          <button className="btn login-btn">
            <FaUserCircle className="icon" /> Login
          </button>
          {isDropdownVisible && (
            <div className="dropdown">
              <ul>
                <li onClick={() => navigate("/")}>My Profile</li>
                <li onClick={() => navigate("/")}>Orders</li>
                <li onClick={() => navigate("/")}>Rewards</li>
                <li onClick={() => navigate("/")}>Gift Cards</li>
              </ul>
            </div>
          )}
        </div>

      
        <div
          className="filter-container"
          onMouseEnter={() => setIsFilterDropdownVisible(true)} 
          onMouseLeave={() => setIsFilterDropdownVisible(false)} 
        >
          <button className="btn filter-btn">
            <FaFilter className="icon" /> Filter 
          </button>
          {isFilterDropdownVisible && (
            <div className="filter-dropdown">
              {/* <ul>
                <li onClick={() => console.log("Category Filter Clicked")}>
                  Category
                </li>
                <li onClick={() => console.log("Price Range Filter Clicked")}>
                  Price Range
                </li>
                <li onClick={() => console.log("Brand Filter Clicked")}>
                  Brand
                </li>
                <li onClick={() => console.log("Sorting Options Clicked")}>
                  Add Sorting 
                </li>
              </ul> */}
            </div>
          )}
        </div>

        
        <button onClick={handleGoToCart} className="btn cart-btn">
          <FaShoppingCart className="icon" /> Cart
        </button>
      </div>
    </div>
  );
};

export default Header;
