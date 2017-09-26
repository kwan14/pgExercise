
const settings = require("./settings");


module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: settings.localhost,
      port: settings.port,
      user: settings.user,
      password: settings.password,
      database: settings.database
    }
  },

  migrations: {
    tableName: 'knex_migrations'
    }

}
