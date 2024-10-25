import React from 'react';

export function PurchaseConfirmation({ cart, totalPrice, setpageView, emptyCart }) {

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/update-stock", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!res.ok) {
        throw new Error('Failed to update stock');
      }

      // Empty cart and navigate back to products page after checkout
      emptyCart();
      setpageView("products");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="purchaseConfirmation">
      <h1>Thank you for your purchase!</h1>
      <p>Here are the items you've bought:</p>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      <button onClick={handleCheckout}>
        Return to homepage
      </button>
    </div>
  );
}
