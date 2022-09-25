import { encode } from "plantuml-encoder"

export const getUrl = (uml) => `https://www.plantuml.com/plantuml/svg/${encode(uml)}`


export const parseUML = ({schemas}) => {
    let uml = '@startuml'
    let constraints = []

    console.log(schemas);
    schemas.forEach(({nombre, tablas, activated}) => {
     
      if (activated){
        tablas.forEach(e => {
          uml += `\nobject ${nombre === 'public' ? e.nombre : nombre+'.'+e.nombre}`
          e.atributos.forEach(a => {
            uml += `\n${nombre === 'public' ? e.nombre : nombre+'.'+e.nombre} : ${a.nombre} : ${a.dato}`
          })
          /*e.constraints.forEach(c => {
            constraints.push(c)
          }) */
      });
      }
    })

    constraints.forEach(c => {
       uml += `\n${c.foreign_schema === 'public' ? c.foreign_table: c.foreign_table +'.'+ c.foreign_table} <|-- ${c.schema === 'public' ? c.table : c.schema+'.'+c.table}`
    })

    uml += '\n@enduml'
    return uml;
}

export const esquemas = [
  {
    nombre: "public",
    tablas: [
      {
        nombre: "personas",
        atributos: [
          { nombre: "id", dato: "integer" },
          { nombre: "nombre", dato: "character varying" },
        ],
        constraints: [],
      },
      {
        nombre: "telefonos",
        atributos: [
          { nombre: "idpersona", dato: "integer" },
          { nombre: "telefono", dato: "integer" },
        ],
        constraints: [
          {
            schema: "public",
            table: "telefonos",
            col: "idpersona",
            constraint_name: "fk_telefonos",
            foreign_schema: "public",
            foreign_table: "personas",
            foreign_col: "id",
          },
          {
            schema: "public",
            table: "telefonos",
            col: "idpersona",
            constraint_name: "fk_tel_pers2",
            foreign_schema: "public",
            foreign_table: "pers2",
            foreign_col: "idper",
          },
        ],
      },
      {
        nombre: "pers2",
        atributos: [
          { nombre: "idper", dato: "integer" },
          { nombre: "name", dato: "character varying" },
        ],
        constraints: [],
      },
    ],
  },
  {
    nombre: "esq",
    tablas: [
      {
        nombre: "personajes",
        atributos: [
          { nombre: "identificadcor", dato: "integer" },
          { nombre: "nombre", dato: "character varying" },
        ],
        constraints: [
          {
            schema: "esq",
            table: "personajes",
            col: "identificadcor",
            constraint_name: "fk_esqper_id",
            foreign_schema: "public",
            foreign_table: "personas",
            foreign_col: "id",
          },
        ],
      },
    ],
  },
];