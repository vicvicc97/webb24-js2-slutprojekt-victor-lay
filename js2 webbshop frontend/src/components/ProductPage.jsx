import React from 'react';
import { Product } from './Product';

export function ProductPage({ products, setCart, setProducts, cart }) {

  const addToCart = (product) => {
    // Decrease stock for the selected product
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    );
    setProducts(updatedProducts);

    // Check if product is already in cart, update quantity or add to cart
    const existingProductInCart = cart.find(p => p.id === product.id);
    if (existingProductInCart) {
      setCart(cart.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="productPage">
      <div className="productList">
        {products.length > 0 ? (
          products.map(product => (
            <Product
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))
        ) : (
          // Display a message when no products match the search
          <p className="noProduct">No products found.</p>
        )}
      </div>
    </div>
  );
}
