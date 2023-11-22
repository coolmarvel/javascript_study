const Sequelize = require("sequelize");

const config = {};
config.host = "localhost";
config.user = "postgres";
config.password = "password";
config.port = 5432;
config.database = "postgres";
config.dialect = "postgres";

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);

module.exports = db;
