import fs from 'fs/promises'; // Use promises-based fs

const productsList = './products.json';

// Function to fetch products from products.json
export async function fetchProducts() {
  try {
    const data = await fs.readFile(productsList, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    throw new Error('Failed to load products');
  }
}

// Function to update products in products.json
export async function updateProducts(products) {
  try {
    await fs.writeFile(productsList, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing to products file:', error);
    throw new Error('Failed to save updated stock');
  }
}
