const Pool = require("pg").Pool;
const { db, user, password } = require("./config");

const pool = new Pool({
  user: user,
  password: password,
  host: "localhost",
  port: 5432,
  database: db,
});

module.exports = pool;
//client\src\Components\Headers\Headers.js