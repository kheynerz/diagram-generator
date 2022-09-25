import { createContext,useState } from "react";

export const DiagramContext = createContext();

export const DiagramContextProvider = (props) =>{
    const [diagram, setDiagram] = useState({
      nombre: "diagrama1",
      schemas: [
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
      ],
    });

    const getTable = (schema) => {
        const table = diagram.schemas.find((s) => {
            if (s.nombre === schema){
                return s
            }
        })?.tablas

        return table
    }

    return(
        <DiagramContext.Provider  value={{diagram,setDiagram,getTable}}>
            {props.children}
        </DiagramContext.Provider>
    )
}
