const bcrypt = require('bcryptjs');
const UserModel = require('./User');
const CursoModel = require('./curso');
const AulaModel = require('./aula');
const ExercicioModel = require('./exercicio');
const MaterialModel = require('./material');
const ResumoModel = require('./resumo');

// Função para popular o banco com dados iniciais (opcional)
async function seed() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Criar usuário professor
    const professorId = await UserModel.createUser({
      name: 'Admin',
      email: 'admin@teste.com',
      password: hashedPassword,
      role: 'professor',
      status: 'active',
    });

    // Criar curso
    const cursoId = await CursoModel.createCurso({
      titulo: 'Introdução ao SQLite',
      descricao: 'Descrição inicial do curso',
      categoria: 'Geral',
      nivel: 'basico',
      duracao: '1 mês',
      professor_id: professorId,
      preco: 0,
      imagem: null,
      status: 'ativo',
    });

    console.log('[MySQL2] Dados iniciais criados!');
  } catch (error) {
    console.error('[MySQL2] Erro ao criar dados iniciais:', error);
  }
}

module.exports = {
  seed,
};
