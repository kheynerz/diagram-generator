import { encode } from "plantuml-encoder"

export const getUrl = (uml) => `https://www.plantuml.com/plantuml/svg/${encode(uml)}`


export const parseUML = ({schemas}) => {
    let uml = '@startuml'
    let constraints = []
    let activatedTables = []
    schemas.forEach(({nombre, tablas, activated}) => {
      if (activated){
        tablas.forEach(t => {
          if(t?.activated){
            uml += `\nobject ${nombre === 'public' ? t.nombre : nombre+'.'+t.nombre}`
            activatedTables.push(`${nombre === 'public' ? t.nombre : nombre+'.'+t.nombre}`)
            t.atributos.forEach(a => {
              if(a?.activated){
                uml += `\n${nombre === 'public' ? t.nombre : nombre+'.'+t.nombre} : ${a.nombre} : ${a.dato}`
              }
            })
          }
          t.constraints.forEach(c => {
            if(c?.activated){
              constraints.push(c)
            }
          })
      });
      }
    })

    console.log(constraints);
    console.log(activatedTables);
    constraints.forEach(c => {
      let foreign_table = `${c.foreign_schema === 'public' ? c.foreign_table: c.foreign_schema +'.'+ c.foreign_table}`
      let table = `${c.schema === 'public' ? c.table : c.schema+'.'+c.table}`
      let arrowTypes = ['<|--','o--', '<--', '*--']

      console.log(foreign_table, table);
      if (activatedTables.includes(foreign_table) && activatedTables.includes(table)) {
        uml += `\n${foreign_table} ${arrowTypes[c.type]} ${table}`
      }
    })

    uml += '\n@enduml'

    
    console.log(uml);
    return uml;
}