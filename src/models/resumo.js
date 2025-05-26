const db = require('../config/database');

// Buscar resumo por ID
async function getResumoById(id) {
  const [rows] = await db.query('SELECT * FROM resumos WHERE id = ?', [id]);
  return rows[0];
}

// Buscar resumos por aluno
async function getResumosByAlunoId(alunoId) {
  const [rows] = await db.query('SELECT * FROM resumos WHERE aluno_id = ?', [alunoId]);
  return rows;
}

// Criar novo resumo
async function createResumo({ titulo, conteudo, categoria, tags, publico, aluno_id }) {
  const sql = `
    INSERT INTO resumos (titulo, conteudo, categoria, tags, publico, data_criacao, data_atualizacao, aluno_id)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)
  `;
  const [result] = await db.query(sql, [
    titulo,
    conteudo,
    categoria,
    tags || null,
    publico || false,
    aluno_id
  ]);
  return result.insertId;
}

// Atualizar resumo
async function updateResumo(id, { titulo, conteudo, categoria, tags, publico }) {
  const sql = `
    UPDATE resumos
    SET titulo = ?, conteudo = ?, categoria = ?, tags = ?, publico = ?, data_atualizacao = NOW()
    WHERE id = ?
  `;
  await db.query(sql, [titulo, conteudo, categoria, tags || null, publico || false, id]);
}

// Deletar resumo
async function deleteResumo(id) {
  await db.query('DELETE FROM resumos WHERE id = ?', [id]);
}

module.exports = {
  getResumoById,
  getResumosByAlunoId,
  createResumo,
  updateResumo,
  deleteResumo,
};
