import { encode } from "plantuml-encoder"

export const getUrl = (uml) => `https://www.plantuml.com/plantuml/svg/${encode(uml)}`


export const parseUML = (schemes) => {
    let uml = '@startuml'

    let foreigns = []
    schemes.forEach(({nombre, tablas}) => {
        console.log(nombre);
        tablas.forEach(e => {
            uml += `\nobject ${e.nombre}`
            e.atributos.forEach(a => {
                uml += `\n${e.nombre} : ${a.nombre} : ${a.dato}`
                if (a.constraints){
                    a.constraints.forEach(c => {
                        if (c.tipo === 'f'){
                            foreigns.push({origin: e.nombre, dest : c.tabla})
                        }
                    })
                }
            })
        });
    })

    foreigns.forEach(f => {
        uml += `\n${f.dest} <|-- ${f.origin}`
    })

    uml += '\n@enduml'
    return uml;
}


/* {
  usuario: [
    {
      nombre : '',
      proyectos: [
        {
          nombreProyecto: "proyecto1",
          diagramas: {
            id: 0,
            nombre: "diagrama1",
            descripcion: "descr",

            tablas: [
              {
                esquema: "public",
                nombre: "personas",
                atributos: [
                  {
                    nombre: "id",
                    dato: "character",
                    constraints: [
                      {
                        nombre: "pk_personas",
                        tipo: "p",
                      },
                    ],
                  },
                  {
                    nombre: "nombre",
                    dato: "character varying",
                  },
                ],
              },
              {
                esquema: "poo"
                nombre: "telefonos",
                atributos: [
                  {
                    nombre: "id",
                    dato: "character",
                    constraints: [
                      {
                        nombre: "pk_telefonos",
                        tipo: "p",
                      },
                      {
                        nombre: "pk_personas",
                        tipo: "f",
                        tabla: "personas",
                        atributo: "id",
                      },
                    ],
                  },
                  {
                    nombre: "telefono",
                    dato: "character varying",
                    constraints: [
                      {
                        nombre: "pk_telefonos",
                        tipo: "p",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ]
}
 */



[
	{
        nombre : 'public',
        tablas : [
            
                {
                    nombre : 'personas',
                    atributos : [
                        {"nombre" : "id",
                         "dato" : "integer"
                    
                        },
                        {
                            "nombre" : "nombre",
                            "dato" : "character varying"
                        }
                    ]
                },
                {
            personas : {
                
            },
            telefonos : {
                "idpersona" : "integer",
                "telefono" : "integer"
            }
            }
        ]
		
	}
]
