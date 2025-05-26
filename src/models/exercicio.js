const db = require('../config/database');

// Buscar exercício por ID
async function getExercicioById(id) {
  const [rows] = await db.query('SELECT * FROM exercicios WHERE id = ?', [id]);
  return rows[0];
}

// Buscar exercícios por aula
async function getExerciciosByAulaId(aulaId) {
  const [rows] = await db.query('SELECT * FROM exercicios WHERE aula_id = ?', [aulaId]);
  return rows;
}

// Criar novo exercício
async function createExercicio({ pergunta, resposta_correta, aula_id }) {
  const sql = `
    INSERT INTO exercicios (pergunta, resposta_correta, aula_id)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(sql, [pergunta, resposta_correta, aula_id]);
  return result.insertId;
}

// Atualizar exercício
async function updateExercicio(id, { pergunta, resposta_correta }) {
  const sql = `
    UPDATE exercicios
    SET pergunta = ?, resposta_correta = ?
    WHERE id = ?
  `;
  await db.query(sql, [pergunta, resposta_correta, id]);
}

// Deletar exercício
async function deleteExercicio(id) {
  await db.query('DELETE FROM exercicios WHERE id = ?', [id]);
}

module.exports = {
  getExercicioById,
  getExerciciosByAulaId,
  createExercicio,
  updateExercicio,
  deleteExercicio
};
