import pool from "../db.js";

export const getUsers = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM users"
  );

  res.json(result.rows);
};

export const createUser = async (req, res) => {
  const { name } = req.body;

  const result = await pool.query(
    "INSERT INTO users (name) VALUES ($1) RETURNING *",
    [name]
  );

  res.status(201).json(result.rows[0]);
};