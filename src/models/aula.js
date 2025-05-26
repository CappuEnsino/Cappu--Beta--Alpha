const db = require('../config/database');

// Buscar uma aula por ID
async function getAulaById(id) {
  const [rows] = await db.query('SELECT * FROM aulas WHERE id = ?', [id]);
  return rows[0];
}

// Buscar todas as aulas de um curso
async function getAulasByCursoId(cursoId) {
  const [rows] = await db.query(
    'SELECT * FROM aulas WHERE curso_id = ? ORDER BY ordem ASC',
    [cursoId]
  );
  return rows;
}

// Criar nova aula
async function createAula(aulaData) {
  const { titulo, descricao, video, ordem, duracao, status, curso_id } = aulaData;
  const sql = `
    INSERT INTO aulas (titulo, descricao, video, ordem, duracao, status, curso_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [
    titulo,
    descricao,
    video || null,
    ordem,
    duracao || null,
    status || 'ativo',
    curso_id,
  ]);
  return result.insertId;
}

// Atualizar uma aula existente
async function updateAula(id, aulaData) {
  const { titulo, descricao, video, ordem, duracao, status } = aulaData;
  const sql = `
    UPDATE aulas
    SET titulo = ?, descricao = ?, video = ?, ordem = ?, duracao = ?, status = ?
    WHERE id = ?
  `;
  await db.query(sql, [
    titulo,
    descricao,
    video,
    ordem,
    duracao,
    status,
    id,
  ]);
}

// Deletar aula
async function deleteAula(id) {
  await db.query('DELETE FROM aulas WHERE id = ?', [id]);
}

module.exports = {
  getAulaById,
  getAulasByCursoId,
  createAula,
  updateAula,
  deleteAula,
};
