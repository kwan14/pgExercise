
function getDb (cb) {

  const settings = require("./settings");

  const knex = require("knex")({
    client: 'pg',
    connection: {
      host: settings.localhost,
      port: settings.port,
      user: settings.user,
      password: settings.password,
      database: settings.database
    }
  });

  cb(knex);
}

function getName () {
  return [process.argv[2], process.argv[3], process.argv[4]];
}

function insertName (name) {
  getDb((knex) => {
    knex("famous_people").insert({ first_name: name[0], last_name: name[1], birthdate: name[2] }).asCallback((error, rows) => {
      if (error) {
        console.log(error);
      } else {
        knex.destroy();
      }
    });
  });
}

insertName(getName());