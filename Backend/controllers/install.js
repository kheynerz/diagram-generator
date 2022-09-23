const fs = require('fs');
const { execute } = require('./db')

exports.installProcedures = async (config) => {
  let script = "";
  try {
    script = fs.readFileSync("./dbScripts/procedures.sql", "utf8");
  } catch (err) {
    return { code: 500, msg: "File not found", err };
  }
  return execute(config, script, "Wrong Credentials", "Installation Complete");
}


exports.checkSchema = async (config) => {
  return execute(config, 'SELECT plantuml_generated.check_schema();', 'Not installed', 'Success')
}