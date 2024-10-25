import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { NavBar } from './Navbar';
import { Error } from './Error';
import { ProductPage } from "./ProductPage";
import { ShoppingCart } from "./ShoppingCart";
import { PurchaseConfirmation } from "./PurchaseConfirmation";
import { fetchProducts } from "../utils/fetchproducts";

export function App() {
  const [pageView, setpageView] = useState("products");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("az");
  const [error, setError] = useState(null);

  // Fetch products based on search query and sort option
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(searchQuery, sortOption);
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadProducts();
  }, [searchQuery, sortOption]);  // Re-fetch products when searchQuery or sortOption changes

  return (
    <div>
      <h1 id="title">PREMIUM APPLE STORE</h1>
      <NavBar setpageView={setpageView} cart={cart} />


      {pageView === "products" && (
        <>
          <SearchBar setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
          {error && <Error/>}
          <ProductPage products={products} setCart={setCart} setProducts={setProducts} cart={cart} />
        </>
      )}


      {pageView === "cart" && (
        <ShoppingCart 
          cart={cart} 
          products={products} 
          setCart={setCart} 
          setProducts={setProducts} 
          setpageView={setpageView} 
        />
      )}

      {pageView === "checkout" && (
        <PurchaseConfirmation 
          cart={cart} 
          totalPrice={cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} 
          setpageView={setpageView} 
          emptyCart={() => setCart([])} 
        />
      )}
    </div>
  );
}
