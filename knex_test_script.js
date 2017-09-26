
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
  return process.argv[2];
}

function displayName(row) {
  console.log("Searching...");
  if (row) {
    console.log("Found 1 person(s) by the name '" + getName() + "'");
    console.log(`${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
  }
  else {
    console.log("Name not found...");
  }
}

function searchName (name, cb) {
  getDb((knex) => {
    knex.select().from("famous_people").where("first_name", name).orWhere("last_name", name).asCallback((error, rows) => {
      if (error) {
        console.log(error);
      } else {
        cb(rows[0]);
        knex.destroy();
      }
    });
  });
}

searchName(getName(), displayName);

