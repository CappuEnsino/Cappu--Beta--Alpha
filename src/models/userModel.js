// models/userModel.js
const db = require("../config/database");
const bcrypt = require("bcryptjs");

// Criar novo usuário com senha criptografada
async function createUser({ name, email, password, role }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, 'pendente')`,
    [name, email, hashedPassword, role]
  );
  return result.insertId;
}

// Buscar usuário pelo e-mail
async function findUserByEmail(email) {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0]; // retorna o primeiro (ou undefined se não houver)
}

// Buscar usuário por ID
async function findUserById(id) {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

// Verificar senha
async function comparePassword(plainText, hashedPassword) {
  return await bcrypt.compare(plainText, hashedPassword);
}

// Atualizar status do usuário (ativo, inativo, pendente)
async function updateUserStatus(id, status) {
  await db.execute(`UPDATE users SET status = ? WHERE id = ?`, [status, id]);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  comparePassword,
  updateUserStatus
};
