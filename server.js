const express = require('express');
const app = express();

app.use(express.json());

// In-memory data
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
];

let products = [
  { id: 1, name: 'Wireless Mouse', price: 29.99, userId: 1 },
  { id: 2, name: 'Mechanical Keyboard', price: 89.99, userId: 1 },
  { id: 3, name: 'USB-C Hub', price: 19.99, userId: 2 },
];

// --- Users Endpoints ---
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// --- Products Endpoints ---
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, price, userId } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Name and price are required' });

  const newProduct = { id: products.length + 1, name, price, userId: userId || null };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// --- Products by User ---
app.get('/users/:id/products', (req, res) => {
  const userProducts = products.filter(p => p.userId === parseInt(req.params.id));
  res.json(userProducts);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

