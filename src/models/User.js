const db = require('../config/database');

// Buscar usuário por ID
async function getUserById(id) {
  const [rows] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
  return rows[0];
}

// Buscar usuário por email
async function getUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
}

// Criar novo usuário
async function createUser({ name, email, password, role, status }) {
  const sql = `
    INSERT INTO Users (name, email, password, role, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [
    name,
    email,
    password,
    role || 'aluno',
    status || 'active',
  ]);
  return result.insertId;
}

// Atualizar usuário
async function updateUser(id, { name, email, password, role, status }) {
  const sql = `
    UPDATE Users
    SET name = ?, email = ?, password = ?, role = ?, status = ?
    WHERE id = ?
  `;
  await db.query(sql, [name, email, password, role, status, id]);
}

// Deletar usuário
async function deleteUser(id) {
  await db.query('DELETE FROM Users WHERE id = ?', [id]);
}

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
