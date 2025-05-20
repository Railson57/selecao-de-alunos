const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('u981546547_selecao_wesley', 'u981546547_wesley', 'S?$w@7r@', {
  host: '45.132.157.103',
  dialect: 'mysql',
  logging: false, // deixe true se quiser ver os logs de queries
});

module.exports = sequelize;
