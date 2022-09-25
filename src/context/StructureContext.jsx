import { useEffect } from "react";
import { createContext,useState } from "react";

export const StructureContext = createContext();

export const StructureContextProvider = (props) =>{
    const [structure, setStructure] = useState([])

    const getTable = (schema) => {
        const table = structure.find((s) => {
            if (s.nombre === schema){
                return s
            }
        })?.tablas

        return table
    }

    return(
        <StructureContext.Provider  value={{structure,setStructure,getTable}}>
            {props.children}
        </StructureContext.Provider>
    )
}
