const fs = require('fs');
const db = require('./db')

exports.installProcedures = async ({hostname, dbName, port, username, password}) => {
  const config = {
    user: username,
    host: hostname,
    database: dbName,
    password: password,
    port: port,
  };

  let script = "";
  try {
    script = fs.readFileSync("./dbScripts/procedures.sql", "utf8");
  } catch (err) {
    return { code: 500, msg: "File not found", err };
  }
  return db.execute(config, script, "Wrong Credentials", "Installation Complete");
}


exports.checkSchema = async (config) => {
  return db.execute(config, 'SELECT plantuml_generated.check_schema();', 'Not installed', 'Success')
}