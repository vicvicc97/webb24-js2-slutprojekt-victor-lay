import React from 'react';

export function ShoppingCart({ cart, products, setCart, setProducts, setpageView }) {

  // Remove item from the cart and update product stock
  const removeFromCart = (productId) => {
    const productToRemove = cart.find(p => p.id === productId);

    if (productToRemove) {
      const updatedProducts = products.map(p => 
        p.id === productId ? { ...p, stock: p.stock + 1 } : p
      );
      setProducts(updatedProducts);

      if (productToRemove.quantity > 1) {
        setCart(cart.map(p => 
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        ));
      } else {
        setCart(cart.filter(p => p.id !== productId));
      }
    }
  };

  // Empty the entire cart
  const emptyCart = () => {
    const updatedProducts = products.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock + cartItem.quantity };
      }
      return p;
    });
    setProducts(updatedProducts);
    setCart([]);
  };

  // Proceed to checkout
  const checkout = () => {
    if (cart.length > 0) {
      setpageView("checkout");
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="shoppingCart">
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button onClick={checkout}>Checkout</button>
          <button onClick={emptyCart}>Empty Cart</button>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
