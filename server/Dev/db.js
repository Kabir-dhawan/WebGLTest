const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getAllItems = async () => {
  const res = await pool.query('SELECT * FROM items');
  return res.rows;
};

const getItemById = async (id) => {
  const res = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return res.rows[0];
};

const createItem = async (name, description) => {
  const res = await pool.query(
    'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return res.rows[0];
};

const updateItem = async (id, name, description) => {
  const res = await pool.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return res.rows[0];
};

const deleteItem = async (id) => {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
  return { message: 'Item deleted successfully' };
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
