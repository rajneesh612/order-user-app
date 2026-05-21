// Import required modules
import express from 'express'; // Express framework
import cors from 'cors'; // CORS middleware
import pool from "./db.js"; // Database connection pool

import logger
from "./middleware/logger.js";

const app = express();
const PORT = 5000; // Port for backend server

// Enable CORS for all routes
app.use(cors());

app.use(logger);
// Enable JSON parsing for incoming requests
app.use(express.json());

// Sample users data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// Sample API route to get users
app.get('/api/users', (req, res) => {
  // Send users array as JSON response
  //fetch users from database
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(result.rows);
  });
});


app.post("/api/users", async (req, res) => {

  const {
    name,
    email,
    password,
  } = req.body;

  const result = await pool.query(
    `
    INSERT INTO users (
      name,
      email,
      password
    )

    VALUES ($1, $2, $3)

    RETURNING *
    `,
    [name, email, password]
  );

  res.json(result.rows[0]);
});

app.post("/api/login", async (req, res) => {

  const {
    email,
    password,
  } = req.body;

  const result = await pool.query(
    `
    SELECT *
    FROM users

    WHERE email = $1
    AND password = $2
    `,
    [email, password]
  );

  if (result.rows.length === 0) {

    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json({
    message: "Login successful",

    user: result.rows[0],
  });
});

app.get("/api/orders", async (req, res) => {

  const result = await pool.query(`
    SELECT
      orders.id,

      users.name AS user_name,

      products.name AS product_name,

      orders.quantity

    FROM orders

    JOIN users
    ON orders.user_id = users.id

    JOIN products
    ON orders.product_id = products.id
  `);

  res.json(result.rows);
});

  app.get("/api/products", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM products"
  );

  res.json(result.rows);
});


app.post("/api/orders", async (req, res) => {

  const {
    user_id,
    product_id,
    quantity,
  } = req.body;

  const result = await pool.query(
    `
    INSERT INTO orders (
      user_id,
      product_id,
      quantity
    )

    VALUES ($1, $2, $3)

    RETURNING *
    `,
    [user_id, product_id, quantity]
  );

  res.status(201).json(
    result.rows[0]
  );
});


app.delete("/api/orders/:id", async (req, res) => {

  const { id } = req.params;

  await pool.query(
    `
    DELETE FROM orders
    WHERE id = $1
    `,
    [id]
  );

  res.json({
    message: "Order deleted"
  });
});

  app.put("/api/orders/:id", async (req, res) => {

  const { id } = req.params;

  const { quantity } = req.body;

  const result = await pool.query(
    `
    UPDATE orders

    SET quantity = $1

    WHERE id = $2

    RETURNING *
    `,
    [quantity, id]
  );

  res.json(result.rows[0]);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
