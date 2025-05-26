const db = require('../config/database');

// Buscar curso por ID
async function getCursoById(id) {
  const [rows] = await db.query('SELECT * FROM cursos WHERE id = ?', [id]);
  return rows[0];
}

// Buscar todos os cursos
async function getTodosCursos() {
  const [rows] = await db.query('SELECT * FROM cursos ORDER BY id DESC');
  return rows;
}

// Buscar cursos por professor
async function getCursosByProfessor(professorId) {
  const [rows] = await db.query('SELECT * FROM cursos WHERE professor_id = ?', [professorId]);
  return rows;
}

// Criar um novo curso
async function createCurso(cursoData) {
  const {
    titulo,
    descricao,
    categoria,
    nivel,
    preco,
    imagem,
    status,
    duracao,
    professor_id
  } = cursoData;

  const sql = `
    INSERT INTO cursos (
      titulo, descricao, categoria, nivel, preco,
      imagem, status, duracao, professor_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    titulo,
    descricao,
    categoria,
    nivel,
    preco,
    imagem || null,
    status || 'ativo',
    duracao,
    professor_id
  ]);

  return result.insertId;
}

// Atualizar um curso
async function updateCurso(id, cursoData) {
  const {
    titulo,
    descricao,
    categoria,
    nivel,
    preco,
    imagem,
    status,
    duracao
  } = cursoData;

  const sql = `
    UPDATE cursos
    SET titulo = ?, descricao = ?, categoria = ?, nivel = ?,
        preco = ?, imagem = ?, status = ?, duracao = ?
    WHERE id = ?
  `;

  await db.query(sql, [
    titulo,
    descricao,
    categoria,
    nivel,
    preco,
    imagem || null,
    status || 'ativo',
    duracao,
    id
  ]);
}

// Deletar um curso
async function deleteCurso(id) {
  await db.query('DELETE FROM cursos WHERE id = ?', [id]);
}

module.exports = {
  getCursoById,
  getTodosCursos,
  getCursosByProfessor,
  createCurso,
  updateCurso,
  deleteCurso
};
