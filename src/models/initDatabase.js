const { seed } = require('./models/initDatabase');

async function start() {
  // Aqui você deve garantir que as tabelas estejam criadas (via migração SQL ou script)
  
  await seed();

  // Resto da inicialização do app...
}

start();
