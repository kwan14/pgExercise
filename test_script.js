
function getDb (cb) {

  const pg = require("pg");
  const settings = require("./settings");

  const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    cb(client);
  });

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
  getDb((client) => {
    const queryString = "SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $2::text"
    client.query(queryString, [name, name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      cb(result.rows[0]);
      client.end();
    });
  });
}

searchName(getName(), displayName);
