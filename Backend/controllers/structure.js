const { execute } = require("./db")

exports.getJson = (config) => {
    let query = 'SELECT plantuml_generated.get_json();';
    return execute(config,query,'NO FUNCTION','SUCCESS');
}