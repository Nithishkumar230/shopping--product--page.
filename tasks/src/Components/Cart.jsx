import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";


const fetchCartItems = async () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};


const schema = z.object({
  title: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  description: z.string().min(5, "Description should be at least 5 characters"),
  category: z.string().min(1, "Category is required"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
});

const Cart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  
  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });


  const addItemMutation = useMutation({
    mutationFn: (newProduct) => {
      const updatedCart = [...cartItems, newProduct];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
      toast.success("Product added to cart!");
    },
  });

  
  const removeItemMutation = useMutation({
    mutationFn: (id) => {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
      toast.success("Item removed from cart!");
    },
  });

  //  Compute  total price 
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  
  const handleRemoveFromCart = (id) => {
    removeItemMutation.mutate(id);
  };

  
  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      toast.warn("");
    } else {
      toast.success("Proceeding to checkout!");
      navigate("/checkout");
    }
  };

  //  Navigate to Home
  const handleGoHome = () => {
    navigate("/");
  };

  //  Form Handling for Adding Product
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const newProduct = {
      id: Date.now(),
      title: data.title,
      price: parseFloat(data.price),
      description: data.description,
      category: data.category,
      image: URL.createObjectURL(data.image[0]),
    };
    addItemMutation.mutate(newProduct);
    reset();
  };

  return (
    <div className="content-container">
      <h1 className="content-title">Your Cart</h1>

      
      {cartItems.length === 0 ? (
        <p className="empty"></p>
      ) : (
        <div className="product-list">
          {cartItems.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.title} className="product-image" />
              <h2 className="product-name">{item.title}</h2>
              <p className="product-price">${item.price.toFixed(2)}</p>
              <div className="cart-item-buttons">
                <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      <div className="cart-actions">
        <button className="go-home-btn" onClick={handleGoHome}>Home</button>
      </div>

      {/* Add Product Form */}
      <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Add a New Product</h2>

        <input type="text" placeholder="Product Name" {...register("title")} />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <input type="number" placeholder="Price" step="0.01" {...register("price")} />
        {errors.price && <p className="error">{errors.price.message}</p>}

        <textarea placeholder="Description" {...register("description")}></textarea>
        {errors.description && <p className="error">{errors.description.message}</p>}

        <input type="text" placeholder="Category" {...register("category")} />
        {errors.category && <p className="error">{errors.category.message}</p>}

        <input type="file" {...register("image")} />
        {errors.image && <p className="error">{errors.image.message}</p>}

        <button type="submit">Add to Cart</button>

        <h3 className="total-price">
          <center>Total Price: ${totalPrice.toFixed(2)}</center>
        </h3>

        {/*  Buy Now Button */}
        <div style={{ textAlign: "center" }}>
          <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </form>
    </div>
  );
};

export default Cart;
