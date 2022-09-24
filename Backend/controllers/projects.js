const { execute } = require("./db")

exports.getProjects = (config) => {
    let query = `SELECT plantuml_generated.get_projects('${config.user}');`;
    return execute(config,query,'NO FUNCTION','SUCCESS');
}