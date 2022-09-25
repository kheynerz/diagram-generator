const { execute } = require("./db")

exports.getProjects = (config) => {
    let query = `SELECT plantuml_generated.get_projects('${config.user}');`;
    return execute(config,query,'NO FUNCTION','SUCCESS');
}

exports.newProjects = (body) => {
    //let query = `UPDATE plantuml_generated.projects SET projects = '${JSON.stringify(body[1])}' WHERE username = '${body[0].user}'`;
    let query = `SELECT plantuml_generated.set_projects('${body[0].user}','${JSON.stringify(body[1])}')`
    return execute(body[0],query,'NO FUNCTION','SUCCESS');
}