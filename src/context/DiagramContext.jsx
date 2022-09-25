import { createContext,useState } from "react";

export const DiagramContext = createContext();

export const DiagramContextProvider = (props) =>{
    const [diagram, setDiagram] = useState({
      nombre: "diagrama1",
      schemas: [
        {
          nombre: "public",
          activated: true,
          tablas: [
            {
              nombre: "personas",
              atributos: [{ nombre: "cedula", dato: "integer" }],
              constraints: []
            },
            {
                nombre: "personas2",
                atributos: [{ nombre: "nombre", dato: "character varying" }],
                constraints: []
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
