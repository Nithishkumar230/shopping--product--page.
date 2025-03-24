import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Content.css";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("none");
  const [loading, setLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
    
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === "all" || product.category === category) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );

    if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, category, priceRange, sortOption, products]);

  return (
    <div className="content-container">
      <h1 className="content-title"><center>Product Page</center></h1>

      <div className="filter-container">
  {/* Search Box */}
  <div className="filter-item search-box">
    <input
      type="text"
      className="search-input"
      placeholder=" Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* Category Dropdown */}
  <div className="filter-item category-box">
    <select className="category-select" onChange={(e) => setCategory(e.target.value)} value={category}>
      <option value="all">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelry</option>
      <option value="men's clothing">Men's Clothing</option>
      <option value="women's clothing">Women's Clothing</option>
    </select>
  </div>

  {/* Price Range Slider */}
  <div className="filter-item price-box">
    <label className="price-label"> ${priceRange[0]} - ${priceRange[1]}</label>
    <input
      type="range"
      className="price-range"
      min="0"
      max="1000"
      value={priceRange[1]}
      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
    />
  </div>

  {/* Sort Dropdown */}
  <div className="filter-item sort-box">
    <select className="sort-select" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
      <option value="none"> Sort By</option>
      <option value="priceLowToHigh"> Price: Low to High</option>
      <option value="priceHighToLow"> Price: High to Low</option>
      <option value="newest"> Newest</option>
    </select>
  </div>


      </div>

      {loading ? (
        <div className="spinner-container">
          <ClipLoader size={50} color={"#ff9800"} loading={loading} />
        </div>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h2>{product.title}</h2>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={() => toast.success("Added to cart!")}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;



