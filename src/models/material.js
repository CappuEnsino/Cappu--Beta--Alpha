const db = require('../config/database');

// Buscar material por ID
async function getMaterialById(id) {
  const [rows] = await db.query('SELECT * FROM materiais WHERE id = ?', [id]);
  return rows[0];
}

// Buscar materiais por aula
async function getMateriaisByAulaId(aulaId) {
  const [rows] = await db.query('SELECT * FROM materiais WHERE aula_id = ?', [aulaId]);
  return rows;
}

// Criar novo material
async function createMaterial({ titulo, descricao, url, aula_id }) {
  const sql = `
    INSERT INTO materiais (titulo, descricao, url, aula_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [titulo, descricao, url, aula_id]);
  return result.insertId;
}

// Atualizar material
async function updateMaterial(id, { titulo, descricao, url }) {
  const sql = `
    UPDATE materiais
    SET titulo = ?, descricao = ?, url = ?
    WHERE id = ?
  `;
  await db.query(sql, [titulo, descricao, url, id]);
}

// Deletar material
async function deleteMaterial(id) {
  await db.query('DELETE FROM materiais WHERE id = ?', [id]);
}

module.exports = {
  getMaterialById,
  getMateriaisByAulaId,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
