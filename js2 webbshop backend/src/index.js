import express from 'express';
import cors from 'cors';
import { fetchProducts, updateProducts } from './handledb.js';
import { searchProducts } from './search.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Fetch products route
app.get('/api/products', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to search and sort products
app.get('/api/search', async (req, res) => {
  const { query, sort } = req.query;  // Get query and sort parameters from the request

  try {
    const products = await searchProducts(query, sort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product stock after checkout route
app.post('/api/update-stock', async (req, res) => {
  const cart = req.body.cart;

  try {
    let products = await fetchProducts();

    // Update stock based on cart items
    cart.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      if (product) {
        product.stock = Math.max(0, product.stock - cartItem.quantity);
      }
    });

    // Save the updated products
    await updateProducts(products);

    res.json({ message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
